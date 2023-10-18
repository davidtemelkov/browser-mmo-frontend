import { FC, useEffect, useState } from "react";
import {
  IFetchedUser,
  IQuest,
  getUser,
  initialQuest,
} from "../../services/userService";
import { useParams } from "react-router-dom";

export const Profile: FC = () => {
  const [user, setUser] = useState<IFetchedUser>({
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

  const { email } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(email!);
      setUser(fetchedUser!);
    };

    fetchData();
  }, []);

  const increaseStat = (stat: string) => {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   [stat]: prevUser + 1
    // }));
  };

  return (
    <div className="flex h-[100%] bg-blue-200">
      {/* Left Section - Info and stats */}
      <div className="p-4 rounded-md mr-4 flex flex-col w-1/2 h-[100%]">
        <div className="flex rounded-md h-[25%]">
          <img src={user?.imageURL} alt={user?.name} className="w-[40%]" />
          <div className="ml-5 h-[100%]">
            <p className="leading-[1.20rem] font-semibold">Name</p>
            <p className="leading-[1.20rem]">{user?.name}</p>
            <p className="leading-[1.20rem] font-semibold">Level</p>
            <p className="leading-[1.20rem]">{user?.level} </p>
            <p className="leading-[1.20rem] font-semibold">Exprerience</p>
            <p className="leading-[1.20rem]"> {user?.EXP}</p>
            <p className="leading-[1.20rem] font-semibold">Big D Points</p>
            <p className="leading-[1.20rem]"> {user?.bigDPoints}</p>
          </div>
        </div>

        <div className="h-[70%]">
          <div className="rounded-md p-3 mb-3 h-[25%]">
            <p className="text-xl font-bold">Strength</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.strength}</p>
              <button
                onClick={() => increaseStat("strength")}
                className="border-2 ml-3 p-1 w-[8%] h-[8%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Damage: 0/0</p>
          </div>
          <div className="rounded-md p-3 mb-3 h-[25%]">
            <p className="text-xl font-bold">Dexterity</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.dexterity}</p>
              <button
                onClick={() => increaseStat("dexterity")}
                className="border-2 ml-3 p-1 w-[8%] h-[8%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Crit: 33%</p>
          </div>
          <div className="rounded-md p-3 mb-3 h-[25%]">
            <p className="text-xl font-bold">Constitution</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.constitution}</p>
              <button
                onClick={() => increaseStat("constitution")}
                className="border-2 ml-3 p-1 w-[8%] h-[8%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Life: 300</p>
          </div>
          <div className="rounded-md p-3 mb-3 h-[25%]">
            <p className="text-xl font-bold">Intelligence</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.intelligence}</p>
              <button
                onClick={() => increaseStat("intelligence")}
                className="border-2 ml-3 p-1 w-[8%] h-[8%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Fireball: 300</p>
          </div>
        </div>
      </div>

      {/* Right Section - Inventory and Items */}
      <div className="p-4 rounded-md flex flex-col w-1/2 h-[100%] justify-center">
        <div className="h-[75%] flex w-full justify-center gap-x-3">
          <div className="flex flex-col h-[100%] w-[25%] justify-center">
            <div id="weapon" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src="https://i.imgur.com/WwgIFZF.png"
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="gloves" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNaXAnkP3ISqA_0Sd-EZlPnvP9pavZGTPpGQ&usqp=CAU"
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col h-[100%] w-[25%] justify-center">
            <div id="helmet" className="border rounded-md mb-2 w-[100%]">
              <img
                src="https://i.gyazo.com/deafcb77e357c84500351d52c1637e9c.jpg"
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="chestplate" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src="https://i.imgur.com/uXIQwgV.png?1"
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="boots" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src="https://i.ibb.co/BC2528K/Screenshot-from-2021-10-09-22-49-58.png"
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col  h-[100%] w-[25%] justify-center">
            <div id="amulet" className="border-2 rounded-md mb-2 w-[60%]">
              <img
                src="https://i.imgur.com/G9q3grx.png"
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="shield" className="border rounded-md mb-2 w-[100%]">
              <img
                src="https://i.imgur.com/TuxTeLp.png"
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="ring" className="border rounded-md mb-2 w-[60%]">
              <img
                src="https://i.ibb.co/sPhB0sv/Screenshot-from-2021-10-04-23-05-42.png"
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
        </div>
        <div id="inventory" className="flex h-[25%] w-full border-2">
          <img
            src="https://preview.redd.it/gvquk4atgc531.png?width=589&format=png&auto=webp&s=8f031dfe5f970581ba600c25426dbc08968dbbcc"
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
