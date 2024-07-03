import { FC, useState } from "react";
import { IFetchedUser, IItem } from "../../services/user";
import { GiCheckedShield } from "react-icons/gi";

type InventoryProps = {
  user: IFetchedUser;
  setUser?: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  userIsPlayer: boolean;
  setRerender: (value: React.SetStateAction<boolean>) => void;
  setIsFightStarted: React.Dispatch<React.SetStateAction<boolean>>;
  clickOnItemFunc: (slotKey: string) => Promise<void>;
};

export const Inventory: FC<InventoryProps> = ({
  user,
  userIsPlayer,
  setRerender,
  setIsFightStarted,
  clickOnItemFunc,
}) => {
  const [hoveredItem, setHoveredItem] = useState<IItem | null>(null);

  //TODO: render item can logic can be a custom hook
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

  const handleFightPlayer = async () => {
    setIsFightStarted(true);
    setRerender(true);
  };

  return (
    <div className="px-4 rounded-md flex flex-col w-1/2 justify-center">
      {!userIsPlayer && (
        <button
          onClick={() => handleFightPlayer()}
          className="relative top-10 left-0 bg-blue-300 w-fit p-1 rounded-md"
        >
          Fight
        </button>
      )}
      <div className="h-[70%] flex w-full justify-center gap-x-3">
        <div className="flex flex-col h-[100%] w-[25%] justify-center">
          {/* TODO: Make this a component */}
          <div
            id="weapon"
            className="border rounded-md mb-2 w-[100%] border-blue-300"
            onMouseEnter={() =>
              user.equippedItems.Weapon.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Weapon)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            onMouseEnter={() =>
              user.equippedItems.Gloves.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Gloves)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
        <div className="flex flex-col h-[100%] w-[25%] justify-center items-center">
          <div
            id="helmet"
            className="border rounded-md mb-2 w-[80%] border-blue-300"
            onMouseEnter={() =>
              user.equippedItems.Helmet.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Helmet)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            className="border rounded-md mb-2 w-[80%] border-blue-300"
            onMouseEnter={() =>
              user.equippedItems.Chestplate.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Chestplate)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            className="border rounded-md mb-2 w-[80%] border-blue-300"
            onMouseEnter={() =>
              user.equippedItems.Boots.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Boots)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            onMouseEnter={() =>
              user.equippedItems.Amulet.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Amulet)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            onMouseEnter={() =>
              user.equippedItems.Shield.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Shield)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
            onMouseEnter={() =>
              user.equippedItems.Ring.imageURL !== "" &&
              setHoveredItem(user.equippedItems.Ring)
            }
            onMouseLeave={() => setHoveredItem(null)}
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
        {hoveredItem && renderItemInfo(hoveredItem)}
      </div>
      <div
        id="inventory"
        className="flex h-[25%] w-full border flex-col border-blue-300"
      >
        {userIsPlayer &&
          [...Array(3)].map((_, groupIndex) => (
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
                    onClick={() => userIsPlayer && clickOnItemFunc(itemKey)}
                    onMouseEnter={() =>
                      user.inventory[itemKey].imageURL !== ""
                        ? setHoveredItem(user.inventory[itemKey])
                        : () => {}
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <img src={imageUrl} alt="" className="h-[100%] w-[100%]" />
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};
