import { FC } from "react";
import { useUser } from "../../contexts/userContext";
import { GiCheckedShield } from "react-icons/gi";

export const MagicShop: FC = () => {
  const { user } = useUser();

  // TODO: Make stuff into components and reuse
  return (
    <div className="flex h-full w-full bg-blue-200">
      {/* Magic Shop Keeper */}
      <div className="flex flex-col w-1/2 items-center">
        {/* pic */}
        <div className="flex h-1/2 w-full justify-center">
          <img
            className="mt-3 rounded-md w-[90%] h-[90%]"
            src="https://cdn.inprnt.com/thumbs/35/71/3571d06d42a2c7abd0a4fd44a2c028ce.jpg"
            alt="magicshop"
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
                  user.magicShop[itemKey]?.imageURL ||
                  "https://i.pinimg.com/originals/23/a3/f8/23a3f82a27cc41a66da055fd7d186117.jpg";
                return (
                  <div
                    key={itemKey}
                    className="flex border rounded-md w-[20%] border-blue-300"
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
