import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/localStorage";

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  return (
    <div>
      {getUserFromStorage() && (
        <ul className="flex flex-col gap-4 items-center">
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/profile") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/profile`}>Profile</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/ranking") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/ranking`}>Ranking</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/quests") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/quests`}>Quests</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/work") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/work`}>Work</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/weapons") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/weapons`}>Weapons</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/magic") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/magic`}>Magic</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/mounts") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/mounts`}>Mounts</Link>
          </li>
          <li
            className={`border-2 rounded-md w-[50%] text-center ${
              isSelected("/dungeon") ? "bg-green-300" : "bg-blue-300"
            }`}
          >
            <Link to={`/dungeon`}>Dungeon</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
