import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  IFetchedUser,
  IQuest,
  getUser,
  initalUser,
} from "../../services/userService";

export const CurrentQuests: FC = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [fetchedUser, setFetchedUser] = useState<IFetchedUser>(initalUser);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser(email!);
      console.log(user);
      console.log(user?.currentQuests);

      // Map the fields from the response to the IQuest interface
      const mappedCurrentQuests = Object.keys(user!.currentQuests).reduce(
        (result, key) => {
          const quest = user.currentQuests[key];
          result.set(key, {
            Name: quest.Name,
            ImageURL: quest.ImageURL,
            Time: quest.Time,
            EXP: quest.EXP,
            Gold: quest.Gold,
          });
          return result;
        },
        new Map<string, IQuest>()
      );

      setFetchedUser({
        ...fetchedUser,
        currentQuests: mappedCurrentQuests,
      });
    };

    fetchData();
  }, [email]);

  return (
    <div className="flex w-[100%] h-[100%] justify-center items-center gap-2 bg-blue-200">
      {fetchedUser.currentQuests &&
        Array.from(fetchedUser.currentQuests.values()).map((quest, index) => (
          <div className="flex flex-col w-[33%] h-[100%] justify-center items-center">
            <img
              className="w-[90%] h-[40%]"
              key={index}
              src={quest.ImageURL}
              alt={`Quest ${index}`}
            />
            <p className="text-xl font-semibold">{quest.Name}</p>
            <p className="text-xl font-semibold">EXP {quest.EXP}</p>
            <p className="text-xl font-semibold">Gold {quest.Gold}</p>
          </div>
        ))}
    </div>
  );
};
