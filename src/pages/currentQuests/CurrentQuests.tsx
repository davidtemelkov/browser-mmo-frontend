import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IFetchedUser,
  IQuest,
  getUser,
  initialQuest,
} from "../../services/userService";

export const CurrentQuests: FC = () => {
  const { email } = useParams();

  const [fetchedUser, setFetchedUser] = useState<IFetchedUser>({
    name: "name",
    email: "email@abv.bg",
    createdOn: "00-00-00T00:000:00",
    imageURL: "https://ibb.co/sWmhkXw",
    level: 0,
    gold: 0,
    EXP: 0,
    bigDPoints: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    items: new Map<string, string>([
      ["Amulet", "https://ibb.co/sWmhkXw"],
      ["Boots", "https://ibb.co/sWmhkXw"],
      ["Chestplate", "https://ibb.co/sWmhkXw"],
      ["Gloves", "https://ibb.co/sWmhkXw"],
      ["Helmet", "https://ibb.co/sWmhkXw"],
      ["Ring", "https://ibb.co/sWmhkXw"],
      ["Shield", "https://ibb.co/sWmhkXw"],
      ["Weapon", "https://ibb.co/sWmhkXw"],
    ]),
    weaponShop: new Map<string, string>([
      ["1", ""],
      ["2", ""],
      ["3", ""],
      ["4", ""],
      ["5", ""],
      ["6", ""],
    ]),
    magicShop: new Map<string, string>([
      ["1", ""],
      ["2", ""],
      ["3", ""],
      ["4", ""],
      ["5", ""],
      ["6", ""],
    ]),
    inventory: new Map<string, string>([
      ["1", ""],
      ["2", ""],
      ["3", ""],
      ["4", ""],
      ["5", ""],
      ["6", ""],
      ["7", ""],
      ["8", ""],
      ["9", ""],
      ["10", ""],
      ["11", ""],
      ["12", ""],
      ["13", ""],
      ["14", ""],
      ["15", ""],
    ]),
    mount: "",
    mountImageURL: "",
    isQuesting: false,
    isWorking: false,
    currentQuests: new Map<string, IQuest>([
      ["0", { ...initialQuest }],
      ["1", { ...initialQuest }],
      ["2", { ...initialQuest }],
    ]),
  });

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
    <div className="flex w-[100%] h-[100%] justify-center items-center gap-2 bg-opacity-60 bg-red-800">
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
