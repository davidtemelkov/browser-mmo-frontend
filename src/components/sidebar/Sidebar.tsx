import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserFromStorage } from "../../utils/localStorage";

export const Sidebar: FC = () => {
  const location = useLocation();

  const isSelected = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  return (
    <div>
      {getUserFromStorage() && (
        <ul className="flex flex-col gap-7 items-start text-lg font-semibold w-[80%] ml-5">
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/profile") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/profile`}>Profile</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/ranking") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/ranking`}>Ranking</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/quests") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/quests`}>Quests</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/work") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/work`}>Work</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/weaponshop") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/weaponshop`}>Weapons</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/magicshop") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/magicshop`}>Magic</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/mounts") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/mounts`}>Mounts</Link>
          </li>
          <li
            className={`border border-blue-300 rounded-md p-1 w-full text-center ${
              isSelected("/dungeon") ? "bg-green-400" : "bg-blue-300"
            }`}
          >
            <Link to={`/dungeon`}>Dungeon</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
