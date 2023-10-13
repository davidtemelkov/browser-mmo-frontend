import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearStorage, getUserFromStorage } from "../../utils/localStorage";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full py-3 px-20 sm:px-7 sm:justify-between">
      <ul className="flex">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="ml-10">
          <Link to="/profile">Profile</Link>
        </li>
        {getUserFromStorage() ? (
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
        ) : (
          <li className="ml-10">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
