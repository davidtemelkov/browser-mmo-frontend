import { FC, useEffect, useState } from "react";
import {
  IFetchedUser,
  getUser,
  initalUser,
  upgradeConstitution,
  upgradeDexterity,
  upgradeIntelligence,
  upgradeStrength,
} from "../../services/userService";
import { useLocation, useParams } from "react-router-dom";

export const Profile: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);

  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(email!);
      setUser(fetchedUser!);
    };

    fetchData();
    console.log(user);
  }, []);

  const increaseStrength = async () => {
    const resp = await upgradeStrength();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        strength: prevUser.strength + 1,
      }));
    }
  };

  const increaseDexterity = async () => {
    const resp = await upgradeDexterity();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        dexterity: prevUser.dexterity + 1,
      }));
    }
  };

  const increaseConstitution = async () => {
    const resp = await upgradeConstitution();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        constitution: prevUser.constitution + 1,
      }));
    }
  };

  const increaseIntelligence = async () => {
    const resp = await upgradeIntelligence();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        intelligence: prevUser.intelligence + 1,
      }));
    }
  };

  return (
    <div className="flex h-[100%] bg-blue-200">
      {/* Left Section - Info and stats */}
      <div className="p-4 rounded-md mr-4 flex flex-col w-1/2 h-[100%]">
        <div className="flex rounded-md h-[25%]">
          <img src={user?.imageURL} alt={user?.name} className="w-[35%]" />
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
                disabled={user.gold < user.strength}
                onClick={() => increaseStrength()}
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
                onClick={() => increaseDexterity()}
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
                onClick={() => increaseConstitution()}
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
                onClick={() => increaseIntelligence()}
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
                src={
                  user.items instanceof Map && user.items.has("Weapon")
                    ? user.items.get("Weapon")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="gloves" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Gloves")
                    ? user.items.get("Gloves")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col h-[100%] w-[25%] justify-center">
            <div id="helmet" className="border rounded-md mb-2 w-[100%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Helmet")
                    ? user.items.get("Helmet")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="chestplate" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Chestplate")
                    ? user.items.get("Chestplate")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="boots" className="border-2 rounded-md mb-2 w-[100%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Boots")
                    ? user.items.get("Boots")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col  h-[100%] w-[25%] justify-center">
            <div id="amulet" className="border-2 rounded-md mb-2 w-[60%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Amulet")
                    ? user.items.get("Amulet")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="shield" className="border rounded-md mb-2 w-[100%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Shield")
                    ? user.items.get("Shield")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div id="ring" className="border rounded-md mb-2 w-[60%]">
              <img
                src={
                  user.items instanceof Map && user.items.has("Ring")
                    ? user.items.get("Ring")!.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div className="flex justify-end self-end">
              <img
                src="https://www.iconarchive.com/download/i129718/iconarchive/fairy-tale/Hero-Shield.1024.png"
                alt=""
                className="w-[30%]"
              />
              <p>0</p>
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
