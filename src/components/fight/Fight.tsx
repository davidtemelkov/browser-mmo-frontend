import { FC, useEffect, useState } from "react";
import { IFetchedUser, fightPlayer } from "../../services/user";
import { collectCurrentQuestRewards } from "../../services/quest";
import { fightDungeon } from "../../services/dungeon";

interface FightProps {
  type: "quest" | "dungeon" | "player";
  user: IFetchedUser;
  setFightEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setFightWon: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
}

interface Monster {
  id: string;
  name: string;
  lvl: number;
  health: number;
}

interface FightAction {
  attacker: string;
  target: string;
  damage: number;
  isCritical: boolean;
}

export const Fight: FC<FightProps> = ({
  type,
  user,
  setFightEnded,
  setFightWon,
  setIsLoaded,
  email,
}) => {
  const [actions, setActions] = useState<FightAction[]>([]);
  const [monster, setMonster] = useState<Monster>({
    id: "",
    name: "",
    lvl: 0,
    health: 0,
  });
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [playerHealth, setPlayerHealth] = useState<number>(
    user.constitution + 100
  );

  // TODO: Instead of this, make fight and collect rewards endpoints different]
  useEffect(() => {
    switch (type) {
      case "quest":
        {
          const fetchData = async () => {
            const response = await collectCurrentQuestRewards();

            setActions(parseFightLog(response!.fightLog));
            setFightWon(response!.fightWon);
            setMonster({
              name: response!.monsterName,
              id: response!.monsterId,
              lvl: response!.monsterLevel,
              health: Math.round(response!.monsterHealth),
            });

            const timer = setTimeout(() => {
              setFightEnded(true);
            }, parseFightLog(response!.fightLog).length * 800);
            return () => clearTimeout(timer);
          };

          fetchData();
        }
        break;
      case "dungeon":
        {
          const fetchData = async () => {
            const response = await fightDungeon();

            setActions(parseFightLog(response!.fightLog));
            setFightWon(response!.fightWon);
            setMonster({
              id: response!.monsterId,
              name: response!.monsterName,
              lvl: response!.monsterLevel,
              health: Math.round(response!.monsterHealth),
            });

            const timer = setTimeout(() => {
              setFightEnded(true);
            }, parseFightLog(response!.fightLog).length * 800);
            return () => clearTimeout(timer);
          };

          fetchData();
        }
        break;
      case "player":
        {
          const fetchData = async () => {
            const response = await fightPlayer(email!);

            setActions(parseFightLog(response!.fightLog));
            setFightWon(response!.fightWon);
            setMonster({
              name: response!.userName,
              id: response!.userImageId,
              lvl: response!.userLvl,
              health: Math.round(response!.userHealth),
            });

            const timer = setTimeout(() => {
              setFightEnded(true);
            }, parseFightLog(response!.fightLog).length * 800);
            return () => clearTimeout(timer);
          };

          fetchData();
        }
        break;
    }

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
    <div className="flex justify-between w-full">
      <div className="flex flex-col items-center justify-end w-[40%]">
        <img
          src={`/images/${user.imageId}.jpg`}
          alt={user.name}
          className="w-[50%] h-[70%]"
        />
        <h2 className="mt-3">{user.name}</h2>
        <div className="w-[70%] bg-gray-300 mt-3">
          <div
            className="bg-green-500 text-xs leading-none py-1 text-center text-white"
            style={{
              width: `${(playerHealth / 100) * 100}%`,
              maxWidth: "100%",
            }}
          >
            {playerHealth}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end w-[40%]">
        <img
          src={`/images/${monster.id}.jpg`}
          alt="monster"
          className="w-[50%] h-[70%]"
        />
        <h2 className="mt-3">{monster.name}</h2>
        <div className="w-[70%] bg-gray-300 mt-3">
          <div
            className="bg-red-500 text-xs leading-none py-1 text-center text-white"
            style={{
              width: `${(monster.health / 100) * 100}%`,
              maxWidth: "100%",
            }}
          >
            {monster.health}
          </div>
        </div>
      </div>
    </div>
  );
};
