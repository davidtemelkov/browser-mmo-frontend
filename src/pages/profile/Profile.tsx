import { FC, useEffect, useState } from "react";
import {
  IFetchedUser,
  equipItem,
  getUser,
  initalUser,
} from "../../services/user";
import { useUser } from "../../contexts/userContext";
import { getEmailFromStorage } from "../../utils/localStorage";
import { useParams } from "react-router-dom";
import { Fight } from "../../components/fight";
import { Inventory, Stats } from "../../components/profile";

// TODO: v2.1 !! Think about caching to avoid spamming get user requests
export const Profile: FC = () => {
  const { user, setUser } = useUser();
  const [enemy, setEnemy] = useState<IFetchedUser>(initalUser);
  const { email } = useParams();
  const [rerender, setRerender] = useState<boolean>(false);
  const userIsPlayer = email == undefined || email == getEmailFromStorage();
  const [fightEnded, setFightEnded] = useState<boolean>(false);
  const [fightWon, setFightWon] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFightStarted, setIsFightStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage());
      setUser(fetchedUser!);

      if (!userIsPlayer) {
        const fetchedEnemy = await getUser(email);
        setEnemy(fetchedEnemy!);
      }
    };

    fetchData();
  }, [rerender, email]);

  const handleCollectButtonClick = async () => {
    setIsFightStarted(false);
    setRerender(!rerender);
  };

  const handleEquipItem = async (slotKey: string) => {
    const resp = await equipItem(slotKey);

    if (resp) {
      setRerender(!rerender);
    }
    // TODO: Add some sort of errors and display could not equip item
  };

  return (
    <>
      {isFightStarted ? (
        <div className="flex flex-col h-full w-full bg-blue-200 bg-opacity-60">
          <Fight
            type="player"
            user={user}
            setFightEnded={setFightEnded}
            setFightWon={setFightWon}
            setIsLoaded={setIsLoaded}
            email={email}
          />
          <div className="flex flex-col items-center mt-10 w-full">
            {fightEnded === true && (
              <>
                {fightWon && isLoaded ? (
                  <p className="text-[1.25rem] font-semibold">You won</p>
                ) : (
                  <p className="text-[1.25rem] font-semibold mb-[1%]">
                    You died xD
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center items-end h-1/3 w-full">
            <button
              onClick={handleCollectButtonClick}
              className="border border-blue-300 rounded-md p-2 text-center bg-blue-300 w-fit h-fit mb-10"
            >
              Collect
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full bg-blue-200 bg-opacity-60">
          {/* Left Section - Info and stats */}
          <Stats
            user={userIsPlayer ? user : enemy}
            setUser={setUser}
            userIsPlayer={userIsPlayer}
          />

          {/* Right Section - Inventory and Items */}
          <Inventory
            user={userIsPlayer ? user : enemy}
            setUser={setUser}
            userIsPlayer={userIsPlayer}
            setRerender={setRerender}
            setIsFightStarted={setIsFightStarted}
            clickOnItemFunc={handleEquipItem}
          />
        </div>
      )}
    </>
  );
};
