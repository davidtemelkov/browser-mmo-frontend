import { FC, useEffect, useState } from "react";
import {
  equipItem,
  getUser,
  upgradeConstitution,
  upgradeDexterity,
  upgradeIntelligence,
  upgradeStrength,
} from "../../services/user";
import { useUser } from "../../contexts/userContext";
import { GiCheckedShield } from "react-icons/gi";
import { getEmailFromStorage } from "../../utils/localStorage";

const BASE_EXP = 100.0;
const EXP_EXPONENT = 1.5;

export const Profile: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);
    };

    fetchData();
  }, [rerender]);

  //TODO: use the response to change the gold
  const increaseStrength = async () => {
    const resp = await upgradeStrength();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalStrength: prevUser.totalStrength + 1,
        gold: prevUser.gold - prevUser.strength,
      }));
    }
  };

  const increaseDexterity = async () => {
    const resp = await upgradeDexterity();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalDexterity: prevUser.totalDexterity + 1,
        gold: prevUser.gold - prevUser.dexterity,
      }));
    }
  };

  const increaseConstitution = async () => {
    const resp = await upgradeConstitution();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalConstitution: prevUser.totalConstitution + 1,
        gold: prevUser.gold - prevUser.constitution,
      }));
    }
  };

  const increaseIntelligence = async () => {
    const resp = await upgradeIntelligence();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalIntelligence: prevUser.totalIntelligence + 1,
        gold: prevUser.gold - prevUser.intelligence,
      }));
    }
  };

  const handleEquipItem = async (slotKey: string) => {
    const resp = await equipItem(slotKey);

    if (resp) {
      setRerender(true);
    }
    // TODO: Add some sort of errors and display could not equip item
  };

  function CalculateExpForLvlUp(lvl: number) {
    return Math.floor(BASE_EXP * Math.pow(lvl, EXP_EXPONENT));
  }

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
                    {user?.lvl}
                  </td>
                </tr>
                <tr className="table-row items-baseline  space-x-4">
                  <td className="font-semibold text-[125%]">Experience</td>
                  <td className="font-semibold text-[110%] pl-9">
                    {user.EXP}/{CalculateExpForLvlUp(user.lvl)}
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
              <p className="text-l font-semibold">{user.totalStrength}</p>
              <button
                disabled={user.gold < user.strength}
                onClick={() => increaseStrength()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Damage: ${Math.floor(
              user.damageMin + user.totalStrength / 2
            )}/${user.damageMax + user.totalStrength / 2}`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Dexterity</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user.totalDexterity}</p>
              <button
                onClick={() => increaseDexterity()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Crit: ${(
              user.totalDexterity * 0.01
            ).toFixed(2)}%`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Constitution</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.totalConstitution}</p>
              <button
                onClick={() => increaseConstitution()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Life: ${
              100 + user.totalConstitution
            }`}</p>
          </div>
          <div className="rounded-md p-3 h-[25%]">
            <p className="text-xl font-bold">Intelligence</p>
            <div className="flex justify-end items-center">
              <p className="text-l font-semibold">{user?.totalIntelligence}</p>
              <button
                onClick={() => increaseIntelligence()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            </div>
            <p className="ml-[45%]">{`Fireball: ${user.totalIntelligence}`}</p>
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
                  user.equippedItems.Weapon.imageURL !== ""
                    ? user.equippedItems.Weapon.imageURL
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
                  user.equippedItems.Gloves.imageURL !== ""
                    ? user.equippedItems.Gloves.imageURL
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
                  user.equippedItems.Helmet.imageURL !== ""
                    ? user.equippedItems.Helmet.imageURL
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
                  user.equippedItems.Chestplate.imageURL !== ""
                    ? user.equippedItems.Chestplate.imageURL
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
                  user.equippedItems.Boots.imageURL !== ""
                    ? user.equippedItems.Boots.imageURL
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
                  user.equippedItems.Amulet.imageURL !== ""
                    ? user.equippedItems.Amulet.imageURL
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
                  user.equippedItems.Shield.imageURL !== ""
                    ? user.equippedItems.Shield.imageURL
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
                  user.equippedItems.Ring.imageURL !== ""
                    ? user.equippedItems.Ring.imageURL
                    : "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg"
                }
                alt=""
                className="w-[100%]"
              />
            </div>
            <div className="flex justify-end self-end">
              <GiCheckedShield className="w-[100%] h-[100%]"></GiCheckedShield>
              <p className="text-xl">{user.armourAmount}</p>
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
                    className="border rounded-md w-[100%] border-blue-300 hover:cursor-pointer"
                    onClick={() => handleEquipItem(itemKey)}
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
