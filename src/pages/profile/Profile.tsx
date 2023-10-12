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
    <div className="flex justify-center py-8">
      {/* Left Section - Character Info */}
      <div className="bg-white p-4 shadow-md rounded-md mr-4 flex-1 w-1/2">
        <div className="text-xl font-semibold mb-4">Character Info</div>
        <img
          src={user?.imageURL}
          alt={user?.name}
          className="w-1/2 max-h-64 mb-4"
        />
        <div className="mb-2">
          <strong>Name:</strong> {user?.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user?.email}
        </div>
        <div className="mb-2">
          <strong>Created On:</strong>{" "}
          {new Date(user?.createdOn).toDateString()}
        </div>
        <div className="mb-2">
          <strong>Level:</strong> {user?.level}
        </div>
        <div className="mb-2">
          <strong>Gold:</strong> {user?.gold}
        </div>
        <div className="mb-2">
          <strong>EXP:</strong> {user?.EXP}
        </div>
        <div className="mt-10">
          <strong>Strength:</strong> {user?.strength}
          <button
            onClick={() => increaseStat("strength")}
            className="border-2 ml-3 p-1"
          >
            +
          </button>
        </div>
        <div>
          <strong>Dexterity:</strong> {user?.dexterity}
          <button
            onClick={() => increaseStat("dexterity")}
            className="border-2 ml-3 p-1"
          >
            +
          </button>
        </div>
        <div>
          <strong>Constitution:</strong> {user?.constitution}
          <button
            onClick={() => increaseStat("constitution")}
            className="border-2 ml-3 p-1"
          >
            +
          </button>
        </div>
        <div>
          <strong>Intelligence:</strong> {user?.intelligence}
          <button
            onClick={() => increaseStat("intelligence")}
            className="border-2 ml-3 p-1"
          >
            +
          </button>
        </div>
        {/* Add more character stats here */}
      </div>

      {/* Right Section - Inventory and Items */}
      <div className="bg-white p-4 shadow-md rounded-md flex-2 w-1/2">
        <div className="text-lg font-semibold mb-2">Items</div>
        <div className="flex flex-wrap w-full h-1/2">
          {user &&
            Object.entries(user.items).map(([itemName, itemValue]) => (
              <div key={itemName} className="p-2 border rounded-md mb-2 w-1/3">
                <strong>{itemName}:</strong>
                <img src={itemValue} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
