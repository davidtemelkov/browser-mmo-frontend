import { FC, useEffect } from "react";
import {
  getUser,
  upgradeConstitution,
  upgradeDexterity,
  upgradeIntelligence,
  upgradeStrength,
} from "../../services/userService";
import { useUser } from "../../contexts/userContext";
import { GiCheckedShield } from "react-icons/gi";
import { getEmailFromStorage } from "../../utils/localStorage";

export const Profile: FC = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);
    };

    fetchData();
  }, []);

  //TODO: use the response to change the gold
  const increaseStrength = async () => {
    const resp = await upgradeStrength();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        strength: prevUser.strength + 1,
        gold: prevUser.gold - prevUser.strength,
      }));
    }
  };

  const increaseDexterity = async () => {
    const resp = await upgradeDexterity();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        dexterity: prevUser.dexterity + 1,
        gold: prevUser.gold - prevUser.dexterity,
      }));
    }
  };

  const increaseConstitution = async () => {
    const resp = await upgradeConstitution();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        constitution: prevUser.constitution + 1,
        gold: prevUser.gold - prevUser.constitution,
      }));
    }
  };

  const increaseIntelligence = async () => {
    const resp = await upgradeIntelligence();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        intelligence: prevUser.intelligence + 1,
        gold: prevUser.gold - prevUser.intelligence,
      }));
    }
  };

  return (
    <div className="flex h-full w-full bg-blue-200">
      {/* Left Section - Info and stats */}
      <div className="p-4 rounded-md  flex flex-col w-1/2 h-[100%]">
        <div className="flex rounded-md w-full h-[25%]">
          <div className="w-[27%]">
            <img
              src={user?.imageURL}
              alt={user?.name}
              className="w-full rounded-md"
            />
          </div>
          <div className="flex">
            <div className="ml-5 h-[100%] w-full flex flex-col">
              <table className="w-full table">
                <tr className=" table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">Name</td>
                  <td className="font-semibold text-[110%] pl-9">
                    {user?.name}
                  </td>
                </tr>
                <tr className="table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">Level</td>
                  <td className="font-semibold text-[110%] pl-9">
                    {user?.level}
                  </td>
                </tr>
                <tr className="table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">Experience</td>
                  <td className="font-semibold text-[110%] pl-9">
                    {user?.EXP}/0
                  </td>
                </tr>
                <tr className="table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">BigDPoints</td>
                  <td className="font-semibold text-[110%] pl-9">
                    {user?.bigDPoints}
                  </td>
                </tr>
                <tr className="table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">Ranking</td>
                  <td className="font-semibold text-[110%] pl-9">1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div className="h-[75%]">
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Strength</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.strength}</p>
              <button
                disabled={user.gold < user.strength}
                onClick={() => increaseStrength()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Damage: ${Math.floor(
              user.strength / 2
            )}/${user.strength}`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Dexterity</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.dexterity}</p>
              <button
                onClick={() => increaseDexterity()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Crit: ${(user.dexterity * 0.01).toFixed(
              2
            )}%`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Constitution</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.constitution}</p>
              <button
                onClick={() => increaseConstitution()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Life: ${100 + user.constitution}`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Intelligence</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.intelligence}</p>
              <button
                onClick={() => increaseIntelligence()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Fireball: ${user.intelligence}`}</p>
          </div>
        </div>
      </div>

      {/* Right Section - Inventory and Items */}
      <div className="p-4 rounded-md flex flex-col w-1/2 justify-center">
        <div className="h-[75%] flex w-full justify-center gap-x-3">
          <div className="flex flex-col h-[100%] w-[25%] justify-center">
            <div
              id="weapon"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Weapon.imageURL !== ""
                    ? user.items.Weapon.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div
              id="gloves"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Gloves.imageURL !== ""
                    ? user.items.Gloves.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col h-[100%] w-[25%] justify-center">
            <div
              id="helmet"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Helmet.imageURL !== ""
                    ? user.items.Helmet.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div
              id="chestplate"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Chestplate.imageURL !== ""
                    ? user.items.Chestplate.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div
              id="boots"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Boots.imageURL !== ""
                    ? user.items.Boots.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-col  h-[100%] w-[25%] justify-center">
            <div
              id="amulet"
              className="border rounded-md mb-2 w-[60%] border-blue-300"
            >
              <img
                src={
                  user.items.Amulet.imageURL !== ""
                    ? user.items.Amulet.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div
              id="shield"
              className="border rounded-md mb-2 w-[100%] border-blue-300"
            >
              <img
                src={
                  user.items.Shield.imageURL !== ""
                    ? user.items.Shield.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div
              id="ring"
              className="border rounded-md mb-2 w-[60%] border-blue-300"
            >
              <img
                src={
                  user.items.Ring.imageURL !== ""
                    ? user.items.Ring.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div className="flex justify-end self-end">
              <GiCheckedShield className="w-[100%] h-[100%]"></GiCheckedShield>
              <p className="text-xl">
                {user.items
                  ? user.items.Helmet.armourAmount +
                    user.items.Chestplate.armourAmount +
                    user.items.Gloves.armourAmount +
                    user.items.Boots.armourAmount
                  : 420}
              </p>
            </div>
          </div>
        </div>
        <div
          id="inventory"
          className="flex h-[25%] w-full border flex-col border-blue-300"
        >
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex w-full h-[33.33%]">
              {[...Array(5)].map((_, slotIndex) => {
                const slotNumber = groupIndex * 5 + slotIndex + 1;
                const itemKey = `Item${slotNumber}`;
                const imageUrl =
                  user.inventory[itemKey]?.imageURL ||
                  "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg";

                return (
                  <div
                    key={itemKey}
                    className="border rounded-md w-[100%] border-blue-300"
                  >
                    <img src={imageUrl} alt="" className="h-[100%] w-[100%]" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
