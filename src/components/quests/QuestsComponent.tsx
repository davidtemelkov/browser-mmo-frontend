import { FC } from "react";
import { IFetchedUser, IQuest } from "../../services/user";
import { setCurrentQuest } from "../../services/quest";

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

  const isAvailable = user.dailyQuestCount >= 10 || user.isWorking;

  return (
    <div className="flex w-[100%] h-[100%] bg-blue-200 bg-opacity-60">
      <div
        className={`flex flex-col w-1/3 h-[100%] items-center pt-[5%] ${
          isAvailable
            ? "bg-gray-400"
            : "hover:bg-blue-300 hover:scale-105 transition-transform"
        }`}
        onClick={() => !isAvailable && handleQuestClick(user.quests.Quest0)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md "
          src={`/images/${user.quests.Quest0.id}.jpg`}
          alt={user.quests.Quest0.name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest0.name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest0.exp}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest0.gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest0.time}
        </p>
      </div>
      <div
        className={`flex flex-col w-1/3 h-[100%] items-center pt-[5%] border-l border-r border-blue-300 ${
          isAvailable
            ? "bg-gray-400"
            : "hover:bg-blue-300 hover:scale-105 transition-transform"
        }`}
        onClick={() => !isAvailable && handleQuestClick(user.quests.Quest1)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md"
          src={`/images/${user.quests.Quest1.id}.jpg`}
          alt={user.quests.Quest1.name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest1.name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest1.exp}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest1.gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest1.time}
        </p>
        <div className="mt-[40%] text-lg">{user.dailyQuestCount}/10</div>
      </div>
      <div
        className={`flex flex-col w-1/3 h-[100%] items-center pt-[5%] ${
          isAvailable
            ? "bg-gray-400"
            : "hover:bg-blue-300 hover:scale-105 transition-transform"
        }`}
        onClick={() => !isAvailable && handleQuestClick(user.quests.Quest2)}
      >
        <img
          className="w-[90%] h-[40%] rounded-md"
          src={`/images/${user.quests.Quest2.id}.jpg`}
          alt={user.quests.Quest2.name}
        />
        <p className="text-xl font-semibold">{user.quests.Quest2.name}</p>
        <p className="text-xl font-semibold">EXP {user.quests.Quest2.exp}</p>
        <p className="text-xl font-semibold">Gold {user.quests.Quest2.gold}</p>
        <p className="text-xl font-semibold">
          Duration {user.quests.Quest2.time}
        </p>
      </div>
    </div>
  );
};
