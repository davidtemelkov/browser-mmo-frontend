import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage, getUserFromStorage } from "../../utils/localStorage";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-[100%]">
      <ul className="flex justify-end items-center h-[100%]">
        {getUserFromStorage() && (
          <li className="border-2 rounded-md w-[5%] text-center bg-blue-200 mr-[100px]">
            <button
              onClick={() => {
                clearStorage();
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
