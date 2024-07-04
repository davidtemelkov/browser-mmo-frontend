import { FC, useState } from "react";
import { useUser } from "../../contexts/userContext";
import { sellItem } from "../../services/user";
import { Inventory } from "../../components/profile";
import { Shop } from "../../components/shop";

export const MagicShop: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  const handleSellItem = async (slotKey: string) => {
    const resp = await sellItem(slotKey);

    if (resp) {
      setRerender(!rerender);
    }
    // TODO: Add some sort of errors and display could not sell item
  };

  return (
    <div className="flex h-full w-full bg-blue-200 bg-opacity-60">
      {/* Magic Shop Keeper */}
      <Shop
        type="magicShop"
        user={user}
        setUser={setUser}
        rerender={rerender}
        setRerender={setRerender}
      />
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
