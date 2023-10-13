import { FC, useEffect, useState } from "react";
import { IFetchedUser, getUser } from "../../services/userService";

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
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser("misc@abv.bg");
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
    <div className="flex max-h-screen">
      {/* Left Section - Info and stats */}
      <div className="p-4 shadow-md rounded-md mr-4 flex-1 w-1/2 h-screen">
        <div className="flex border-solid border-2 rounded-md">
          <img src={user?.imageURL} alt={user?.name} className="w-2/5 mb-4" />
          <div className="flex-col justify-evenly">
            <div>
              <p className="text-l font-semibold">Name</p>
              <p>{user?.name}</p>
            </div>
            <div>
              <p className="text-l font-semibold">Level</p>
              <p>{user?.level} </p>
            </div>
            <div>
              <p className="text-l font-semibold">Exprerience</p>
              <p> {user?.EXP}</p>
            </div>
            <div>
              <p className="text-l font-semibold">Big D Points</p>
              <p> {user?.bigDPoints}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border-2 rounded-md p-3 mb-3">
            <p className="text-xl font-bold">Strength</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.strength}</p>
              <button
                onClick={() => increaseStat("strength")}
                className="border-2 ml-3 p-1 w-[4%] h-[4%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Damage: 0/0</p>
          </div>
          <div className="border-2 rounded-md p-3 mb-3">
            <p className="text-xl font-bold">Dexterity</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.dexterity}</p>
              <button
                onClick={() => increaseStat("dexterity")}
                className="border-2 ml-3 p-1 w-[4%] h-[4%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Crit: 33%</p>
          </div>
          <div className="border-2 rounded-md p-3 mb-3">
            <p className="text-xl font-bold">Constitution</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.constitution}</p>
              <button
                onClick={() => increaseStat("constitution")}
                className="border-2 ml-3 p-1 w-[4%] h-[4%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Life: 300</p>
          </div>
          <div className="border-2 rounded-md p-3 mb-3">
            <p className="text-xl font-bold">Intelligence</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.intelligence}</p>
              <button
                onClick={() => increaseStat("intelligence")}
                className="border-2 ml-3 p-1 w-[4%] h-[4%] rounded-md"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">Fireball: 300</p>
          </div>
        </div>
      </div>

      {/* Right Section - Inventory and Items */}
      <div className="p-4 shadow-md rounded-md flex-col w-1/2 h-screen ">
        <div className="h-2/3 flex w-full items-center">
          <div className="flex-col w-1/3">
            <div id="weapon" className="border-2 rounded-md mb-2">
              <img src="https://i.imgur.com/WwgIFZF.png" alt="" />
            </div>
            <div id="gloves" className="p-2 border-2 rounded-md mb-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNaXAnkP3ISqA_0Sd-EZlPnvP9pavZGTPpGQ&usqp=CAU"
                alt=""
              />
            </div>
          </div>
          <div className="flex-col w-1/3">
            <div id="helmet" className="p-2 border rounded-md mb-2 ">
              <img
                src="https://i.gyazo.com/deafcb77e357c84500351d52c1637e9c.jpg"
                alt=""
              />
            </div>
            <div id="chestplate" className="p-2 border-2 rounded-md mb-2 ">
              <img src="https://i.imgur.com/uXIQwgV.png?1" alt="" />
            </div>
            <div id="boots" className="p-2 border-2 rounded-md mb-2 ">
              <img
                src="https://i.ibb.co/BC2528K/Screenshot-from-2021-10-09-22-49-58.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex-col w-1/3">
            <div id="amulet" className="p-2 border-2 rounded-md mb-2 w-5/12">
              <img src="https://i.imgur.com/G9q3grx.png" alt="" />
            </div>
            <div id="shield" className="p-2 border rounded-md mb-2">
              <img src="https://i.imgur.com/TuxTeLp.png" alt="" />
            </div>
            <div id="ring" className="p-2 border rounded-md mb-2 w-5/12">
              <img
                src="https://i.ibb.co/sPhB0sv/Screenshot-from-2021-10-04-23-05-42.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div id="inventory" className="flex h-1/3 w-full border-2">
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
