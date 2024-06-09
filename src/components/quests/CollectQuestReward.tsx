import { FC, useEffect, useState } from "react";
import { IFetchedUser } from "../../services/userService";
import { collectCurrentQuestRewards } from "../../services/questService";

interface CollectQuestRewardProps {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectQuestReward: FC<CollectQuestRewardProps> = ({
  user,
  setUser,
  rerender,
  setRerender,
}) => {
  const [fightLog, setFightLog] = useState<string>("");

  const backgroundImageStyle = {
    backgroundImage: `url(${user.currentQuest.CurrentQuest.ImageURL})`,
    backgroundSize: "cover",
  };

  useEffect(() => {
    const fetchData = async () => {
      setFightLog(await collectCurrentQuestRewards());
    };

    setUser((prevUser) => ({
      ...prevUser,
      gold: prevUser.gold + +prevUser.currentQuest.CurrentQuest.Gold,
    }));

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200">
      <div
        className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200"
        style={backgroundImageStyle}
      >
        <div className="justify-start mt-[5%]">
          <h1 className="text-[2rem] font-semibold ">
            {user.currentQuest.CurrentQuest.Name}
          </h1>
        </div>

        <div className="flex flex-col items-center justify-end mb-[3%] w-full">
          {/* TODO: Check if user won fight, turn fightlog into animation */}
          <p className="text-[1.25rem] font-semibold mb-[1%]">
            You won {user.currentQuest.CurrentQuest.EXP} experience and{" "}
            {user.currentQuest.CurrentQuest.Gold} gold.
          </p>
          <p className="text-[0.8rem] mb-[3%]">{fightLog}</p>
          <button
            className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%] "
            onClick={() => {
              setRerender(!rerender);
            }}
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};
