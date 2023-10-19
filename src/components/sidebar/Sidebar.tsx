import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getEmailFromStorage,
  getUserFromStorage,
} from "../../utils/localStorage";

export const Sidebar: FC = () => {
  const neededToLoadLinksProperlyIGuess = useNavigate();

  return (
    <ul className="flex flex-col gap-3 items-center">
      {getUserFromStorage() && (
        <li className="border-2 rounded-md w-[50%] text-center bg-blue-200">
          <Link to={`/profile?email=${getEmailFromStorage()}`}>Profile</Link>
        </li>
      )}
      {getUserFromStorage() && (
        <li className="border-2 rounded-md w-[50%] text-center bg-blue-200">
          <Link to={`/quests?email=${getEmailFromStorage()}`}>Quests</Link>
        </li>
      )}
    </ul>
  );
};
