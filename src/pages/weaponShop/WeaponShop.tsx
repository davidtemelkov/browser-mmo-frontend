import { FC, useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import { GiCheckedShield } from "react-icons/gi";
import {
  buyItem,
  generateWeaponStore,
  sellItem,
  getUser,
} from "../../services/user";
import { getEmailFromStorage } from "../../utils/localStorage";
import { getCurrentDate } from "../../utils/date";

export const WeaponShop: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  // TODO: Fix bug that doesn't rerender inventory if you buy or sell more than 1
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      if (fetchedUser!.weaponShop.Item1.price === 0) {
        await generateWeaponStore();
        setRerender(!rerender);
      }

      // TODO: Need to set lastplayed to current on generate shops
      // if (fetchedUser!.lastPlayedDate !== getCurrentDate()) {
      //   await generateWeaponStore();
      //   setRerender(!rerender);
      // }
    };

    fetchData();
  }, [rerender]);

  const handleBuyItem = async (slotKey: string) => {
    const resp = await buyItem(slotKey, "weapon");

    if (resp) {
      setRerender(true);
    }
    // TODO: Add some sort of errors and display could not buy item
  };

  const handleSellItem = async (slotKey: string) => {
    const resp = await sellItem(slotKey);

    if (resp) {
      setRerender(true);
    }
    // TODO: Add some sort of errors and display could not sell item
  };

  // TODO: Make stuff into components and reuse
  return (
    <div className="flex h-full w-full bg-blue-200">
      {/* Weapon Shop Keeper */}
      <div className="flex flex-col w-1/2 items-center">
        {/* pic */}
        <div className="flex h-1/2 w-full justify-center">
          <img
            className="mt-3 rounded-md w-[90%] h-[90%]"
            src="https://i.pinimg.com/736x/af/55/66/af5566e6f5651b58cb2656b5d98aafdb.jpg"
            alt="weaponshop"
          />
        </div>
        {/* shop */}
        <div id="shop" className="flex flex-col h-1/2">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex h-[1/2] justify-center">
              {[...Array(3)].map((_, slotIndex) => {
                const slotNumber = groupIndex * 3 + slotIndex + 1;
                const itemKey = `Item${slotNumber}`;
                const imageUrl =
                  user.weaponShop[itemKey]?.imageURL ||
                  "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg";
                return (
                  <div
                    key={itemKey}
                    className="flex border rounded-md w-[20%] border-blue-300"
                    onClick={() => handleBuyItem(itemKey)}
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-[100%] w-[100%] rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* User Items and Inventory */}
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
              <p className="text-xl">
                {user.equippedItems
                  ? user.equippedItems.Helmet.armourAmount +
                    user.equippedItems.Chestplate.armourAmount +
                    user.equippedItems.Gloves.armourAmount +
                    user.equippedItems.Boots.armourAmount
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
                    onClick={() => handleSellItem(itemKey)}
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
