import { FC, useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import {
  buyItem,
  generateMagicStore,
  getUser,
  sellItem,
} from "../../services/user";
import { getEmailFromStorage } from "../../utils/localStorage";
//import { getCurrentDate } from "../../utils/date";
import { Inventory } from "../../components/profile";

export const MagicShop: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  //TODO: This could be a custom hook
  // TODO: Fix bug that doesn't rerender inventory if you buy or sell more than 1
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      if (fetchedUser!.magicShop.Item1.price === 0) {
        await generateMagicStore();
        setRerender(!rerender);
      }

      // TODO: Need to set lastplayed to current on generate shops
      // if (fetchedUser!.lastPlayedDate !== getCurrentDate()) {
      //   await generateMagicStore();
      //   setRerender(!rerender);
      // }
    };

    fetchData();
  }, [rerender]);

  const handleBuyItem = async (slotKey: string) => {
    const resp = await buyItem(slotKey, "weaponshop");

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

  // TODO: Make stuff into components and reuse
  return (
    <div className="flex h-full w-full bg-blue-200 bg-opacity-60">
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
