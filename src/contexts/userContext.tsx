import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { getUser, initalUser } from "../services/userService";
import { getEmailFromStorage } from "../utils/localStorage";
import { IFetchedUser } from "../services/userService";

interface IUserContext {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);

  useEffect(() => {
    async function fetchUser() {
      const email = getEmailFromStorage();
      if (email) {
        const fetchedUser = await getUser(email);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
