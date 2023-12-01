import { FC, useEffect, useState } from "react";
import {
  IFetchedUser,
  IQuest,
  getUser,
  initalUser,
} from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests, setCurrentQuest } from "../../services/questService";
import { CurrentQuest } from "../../components/quests";

export const Quests: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);
  const [questsGenerated, setQuestsGenerated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      console.log(fetchedUser!.quests.Quest0.ImageURL === "");

      if (fetchedUser!.quests.Quest0.ImageURL === "") {
        await generateQuests();
        setQuestsGenerated(true);
      }
    };

    fetchData();
  }, [questsGenerated]);

  const handleQuestClick = async (quest: IQuest) => {
    await setCurrentQuest(quest);
  };

  if (user.isQuesting) {
    return <CurrentQuest user={user} />;
  }

  return (
    <div className="flex w-[100%] h-[100%] bg-blue-200 text-blue-500">
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
      </div>
    </div>
  );
};
