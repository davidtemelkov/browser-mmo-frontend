import { FC } from "react";
import { IFetchedUser, IQuest } from "../../services/userService";
import { setCurrentQuest } from "../../services/questService";

interface QuestsProps {
  user: IFetchedUser;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestsComponent: FC<QuestsProps> = ({
  user,
  rerender,
  setRerender,
}) => {
  const handleQuestClick = async (quest: IQuest) => {
    await setCurrentQuest(quest);
    setRerender(!rerender);
  };

  return (
    <div className="flex w-[100%] h-[100%] bg-blue-200">
      <div
        className="flex flex-col w-[33%] h-[100%] items-center pt-[5%] hover:bg-blue-300 hover:scale-105 transition-transform"
        onClick={() => handleQuestClick(user.quests.Quest0)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md "
          src={user.quests.Quest0.ImageURL}
          alt={user.quests.Quest0.Name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest0.Name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest0.EXP}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest0.Gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest0.Time}
        </p>
      </div>
      <div
        className="flex flex-col w-[33%] h-[100%] items-center pt-[5%] border border-blue-300 hover:bg-blue-300 hover:scale-105 transition-transform"
        onClick={() => handleQuestClick(user.quests.Quest1)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md"
          src={user.quests.Quest1.ImageURL}
          alt={user.quests.Quest1.Name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest1.Name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest1.EXP}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest1.Gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest1.Time}
        </p>
      </div>
      <div
        className="flex flex-col w-[33%] h-[100%] items-center pt-[5%] hover:bg-blue-300 hover:scale-105 transition-transform"
        onClick={() => handleQuestClick(user.quests.Quest2)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md"
          src={user.quests.Quest2.ImageURL}
          alt={user.quests.Quest2.Name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest2.Name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest2.EXP}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest2.Gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest2.Time}
        </p>
      </div>
    </div>
  );
};