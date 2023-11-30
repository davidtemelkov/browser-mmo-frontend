import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage, getUserFromStorage } from "../../utils/localStorage";
import { useUser } from "../../contexts/userContext";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [gold, setGold] = useState(user ? user.gold : 0);

  useEffect(() => {
    if (user) {
      setGold(user.gold);
    }
  }, [user]);

  return (
    <nav className="h-[100%]">
      <div className="absolute top-[4%] ml-[2.7%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[200%] text-white font-serif font-bold">
        TanothStory
      </div>
      {getUserFromStorage() && (
        <ul className="flex justify-between items-center h-[100%] text-blue-600 text-lg font-semibold">
          <li className="border border-blue-300 rounded-md p-1 text-center bg-blue-200 ml-[13.3%]">
            <div>Gold {gold}</div>
          </li>
          <li className="border border-blue-300 p-1 rounded-md text-center bg-blue-200 mr-[6.6%]">
            <button
              onClick={() => {
                clearStorage();
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
