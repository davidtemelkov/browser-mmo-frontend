import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearStorage,
  getEmailFromStorage,
  getUserFromStorage,
} from "../../utils/localStorage";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-30px w-full sm:px-7 sm:justify-between">
      <ul className="flex">
        {getUserFromStorage() ? (
          <>
            <li className="ml-10">
              <Link to={`/profile/${getEmailFromStorage()}`}>Profile</Link>
            </li>
            <li className="ml-10">
              <Link to={`/quests/${getEmailFromStorage()}`}>Quests</Link>
            </li>
            <li className="ml-10">
              <button
                onClick={() => {
                  clearStorage();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
