import { FC, useEffect, useState } from "react";
import { IFetchedUser, getUser, initalUser } from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests } from "../../services/questService";

export const CurrentQuests: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);
  const [questsGenerated, setQuestsGenerated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      if (fetchedUser!.currentQuests.Quest0.ImageURL === "") {
        await generateQuests();
        setQuestsGenerated(true);
      }
    };

    fetchData();
  }, [questsGenerated]);

  return (
    <div className="flex w-[100%] h-[100%] justify-center items-center gap-2 bg-blue-200">
      <div className="flex flex-col w-[33%] h-[100%] justify-center items-center">
        <img
          className="w-[90%] h-[40%]"
          src={user.currentQuests.Quest0.ImageURL}
          alt={user.currentQuests.Quest0.Name}
        />
        <p className="text-xl font-semibold">
          {user.currentQuests.Quest0.Name}
        </p>
        <p className="text-xl font-semibold">
          EXP {user.currentQuests.Quest0.EXP}
        </p>
        <p className="text-xl font-semibold">
          Gold {user.currentQuests.Quest0.Gold}
        </p>
      </div>
      <div className="flex flex-col w-[33%] h-[100%] justify-center items-center">
        <img
          className="w-[90%] h-[40%]"
          src={user.currentQuests.Quest1.ImageURL}
          alt={user.currentQuests.Quest1.Name}
        />
        <p className="text-xl font-semibold">
          {user.currentQuests.Quest1.Name}
        </p>
        <p className="text-xl font-semibold">
          EXP {user.currentQuests.Quest1.EXP}
        </p>
        <p className="text-xl font-semibold">
          Gold {user.currentQuests.Quest1.Gold}
        </p>
      </div>
      <div className="flex flex-col w-[33%] h-[100%] justify-center items-center">
        <img
          className="w-[90%] h-[40%]"
          src={user.currentQuests.Quest2.ImageURL}
          alt={user.currentQuests.Quest2.Name}
        />
        <p className="text-xl font-semibold">
          {user.currentQuests.Quest2.Name}
        </p>
        <p className="text-xl font-semibold">
          EXP {user.currentQuests.Quest2.EXP}
        </p>
        <p className="text-xl font-semibold">
          Gold {user.currentQuests.Quest2.Gold}
        </p>
      </div>
    </div>
  );
};
