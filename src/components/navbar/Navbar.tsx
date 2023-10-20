import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/localStorage";
import { useUser } from "../../contexts/userContext";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [gold, setGold] = useState(user ? user.gold : 0);

  // Use useEffect to update the gold state when the user's gold changes
  useEffect(() => {
    if (user) {
      setGold(user.gold);
    }
  }, [user]);

  return (
    <nav className="h-[100%]">
      <ul className="flex justify-between items-center h-[100%]">
        {user && (
          <li>
            <div className="border-2 rounded-md p-1 text-center bg-blue-200 ml-[200px]">
              Gold {gold}
            </div>
          </li>
        )}
        {user && (
          <li className="border-2 rounded-md text-center bg-blue-200 mr-[100px]">
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
