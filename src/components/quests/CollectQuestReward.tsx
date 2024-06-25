import { FC, useEffect, useState } from "react";
import { IFetchedUser } from "../../services/userService";
import { collectCurrentQuestRewards } from "../../services/questService";

interface CollectQuestRewardProps {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Monster {
  name: string;
  lvl: number;
  imageUrl: string;
  health: number;
}

interface FightAction {
  attacker: string;
  target: string;
  damage: number;
  isCritical: boolean;
}

export const CollectQuestReward: FC<CollectQuestRewardProps> = ({
  user,
  rerender,
  setRerender,
}) => {
  const [actions, setActions] = useState<FightAction[]>([]);
  const [fightWon, setFightWon] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [monster, setMonster] = useState<Monster>({
    name: "",
    lvl: 0,
    imageUrl: "",
    health: 0,
  });
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [playerHealth, setPlayerHealth] = useState<number>(
    user.constitution + 100
  );

  const backgroundImageStyle = {
    backgroundImage: `url(${user.currentQuest.CurrentQuest.ImageURL})`,
    backgroundSize: "cover",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await collectCurrentQuestRewards();

      setActions(parseFightLog(response!.fightLog));
      setFightWon(response!.fightWon);
      setMonster({
        name: response!.monsterName,
        imageUrl: response!.monsterImageUrl,
        lvl: response!.monsterLevel,
        health: Math.round(response!.monsterHealth),
      });
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (currentActionIndex < actions.length) {
      const timer = setTimeout(() => {
        const action = actions[currentActionIndex];
        if (action.target === user.name) {
          setPlayerHealth((prevHealth) =>
            Math.max(0, prevHealth - action.damage)
          );
        } else {
          setMonster((prevMonster) => ({
            ...prevMonster,
            health: Math.max(0, prevMonster.health - action.damage),
          }));
        }
        setCurrentActionIndex(currentActionIndex + 1);
      }, 800); // Delay between actions
      return () => clearTimeout(timer);
    }
  }, [currentActionIndex, actions, user.name]);

  const parseFightLog = (log: string): FightAction[] => {
    const actionLines = log
      .split("\n")
      .filter((line) => line.includes("deals"));
    return actionLines.map((line) => {
      const [attacker, rest] = line.split(" deals ");
      const [damage, targetPart] = rest.split(" damage to ");
      const [target, criticalPart] = targetPart.split(".");
      const isCritical = criticalPart.includes("Critical hit!");
      return {
        attacker,
        target,
        damage: parseInt(damage),
        isCritical,
      };
    });
  };

  return (
    <div
      className="flex flex-col mb-[3%] w-[100%] h-[100%] items-center"
      style={backgroundImageStyle}
    >
      <h1 className="text-[2rem] font-semibold mt-[5%]">
        {user.currentQuest.CurrentQuest.Name}
      </h1>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center justify-end w-[40%]">
          <img
            src={user.imageURL}
            alt={user.name}
            className="w-[50%] h-[70%]"
          />
          <h2 className="mt-3">{user.name}</h2>
          <div className="w-[70%] bg-gray-300 mt-3">
            <div
              className="bg-green-500 text-xs leading-none py-1 text-center text-white"
              style={{
                width: `${(playerHealth / 100) * 100}%`,
              }}
            >
              {playerHealth}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end w-[40%]">
          <img
            src={monster.imageUrl}
            alt="monster"
            className="w-[50%] h-[70%]"
          />
          <h2 className="mt-3">{monster.name}</h2>
          <div className="w-[70%] bg-gray-300 mt-3">
            <div
              className="bg-red-500 text-xs leading-none py-1 text-center text-white"
              style={{ width: `${(monster.health / 100) * 100}%` }}
            >
              {monster.health}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 w-full">
        {currentActionIndex >= actions.length && (
          <>
            {fightWon && isLoaded ? (
              <p className="text-[1.25rem] font-semibold">
                You won {user.currentQuest.CurrentQuest.EXP} experience and{" "}
                {user.currentQuest.CurrentQuest.Gold} gold.
              </p>
            ) : (
              <p className="text-[1.25rem] font-semibold mb-[1%]">
                You died to {monster.name} xD
              </p>
            )}
            <button
              className="p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%]"
              onClick={() => {
                setRerender(!rerender);
              }}
            >
              Collect
            </button>
          </>
        )}
      </div>
    </div>
  );
};
