import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearStorage,
  getEmailFromStorage,
  getUserFromStorage,
} from "../../utils/localStorage";
import { IFetchedUser, getUser, initalUser } from "../../services/userService";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IFetchedUser>(initalUser);

  if (getUserFromStorage()) {
    const email = getEmailFromStorage();

    useEffect(() => {
      const fetchData = async () => {
        const fetchedUser = await getUser(email!);
        setUser(fetchedUser!);
      };

      fetchData();
    }, []);
  }

  return (
    <nav className="h-[100%]">
      <ul className="flex justify-between  items-center h-[100%]">
        {getUserFromStorage() && (
          <li>
            <div className="border-2 rounded-md p-1 text-center bg-blue-200 ml-[200px]">
              Gold {user.gold}
            </div>
          </li>
        )}
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
