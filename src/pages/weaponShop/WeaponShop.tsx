import { FC, useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import {
  buyItem,
  generateWeaponStore,
  sellItem,
  getUser,
  IItem,
} from "../../services/user";
import { getEmailFromStorage } from "../../utils/localStorage";
//import { getCurrentDate } from "../../utils/date";
import { Inventory } from "../../components/profile";

export const WeaponShop: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<IItem | null>(null);

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
      setRerender(!rerender);
    }
    // TODO: Add some sort of errors and display could not buy item
  };

  const handleSellItem = async (slotKey: string) => {
    const resp = await sellItem(slotKey);

    if (resp) {
      setRerender(!rerender);
    }
    // TODO: Add some sort of errors and display could not sell item
  };

  const renderItemInfo = (item: IItem) => {
    return (
      <div className="absolute bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p>Name: {item.name}</p>
        {item.whatItem === "Weapon" && (
          <>
            <p>Damage Min: {item.damageMin}</p>
            <p>Damage Max: {item.damageMax}</p>
          </>
        )}
        {item.whatItem === "Shield" && <p>Block Chance: {item.blockChance}</p>}
        {item.whatItem !== "Shield" &&
          item.whatItem !== "Weapon" &&
          item.whatItem !== "Ring" &&
          item.whatItem !== "Amulet" && <p>Armour: {item.armourAmount}</p>}
        {item.strength !== 0 && <p>Strength: {item.strength}</p>}
        {item.dexterity !== 0 && <p>Dexterity: {item.dexterity}</p>}
        {item.constitution !== 0 && <p>Constitution: {item.constitution}</p>}
        {item.intelligence !== 0 && <p>Intelligence: {item.intelligence}</p>}

        <p>Price: {item.price}</p>
      </div>
    );
  };

  // TODO: Make stuff into components and reuse
  return (
    <div className="flex h-full w-full bg-blue-200 bg-opacity-60">
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
                    onMouseEnter={() =>
                      user.weaponShop[itemKey].imageURL !== ""
                        ? setHoveredItem(user.weaponShop[itemKey])
                        : () => {}
                    }
                    onMouseLeave={() => setHoveredItem(null)}
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
        {hoveredItem && renderItemInfo(hoveredItem)}
      </div>
      {/* User Items and Inventory */}
      <Inventory
        user={user}
        setUser={setUser}
        userIsPlayer={true}
        setRerender={setRerender}
        setIsFightStarted={() => {}}
        clickOnItemFunc={handleSellItem}
      />
    </div>
  );
};
