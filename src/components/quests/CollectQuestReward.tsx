import { FC, useState } from "react";
import { IFetchedUser } from "../../services/user";
import { Fight } from "../fight";

interface CollectQuestRewardProps {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectQuestReward: FC<CollectQuestRewardProps> = ({
  user,
  rerender,
  setRerender,
}) => {
  const [fightEnded, setFightEnded] = useState<boolean>(false);
  const [fightWon, setFightWon] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const backgroundImageStyle = {
    backgroundImage: `url(${user.currentQuest.CurrentQuest.ImageURL})`,
    backgroundSize: "cover",
  };

  return (
    <div
      className="flex flex-col mb-[3%] w-[100%] h-[100%] items-center"
      style={backgroundImageStyle}
    >
      <h1 className="text-[2rem] font-semibold mt-[5%]">
        {user.currentQuest.CurrentQuest.Name}
      </h1>
      <Fight
        type="quest"
        user={user}
        setFightEnded={setFightEnded}
        setFightWon={setFightWon}
        setIsLoaded={setIsLoaded}
      />
      <div className="flex flex-col items-center mt-10 w-full">
        {fightEnded === true && (
          <>
            {fightWon && isLoaded ? (
              <p className="text-[1.25rem] font-semibold">
                You won {user.currentQuest.CurrentQuest.EXP} experience and{" "}
                {user.currentQuest.CurrentQuest.Gold} gold.
              </p>
            ) : (
              <p className="text-[1.25rem] font-semibold mb-[1%]">
                You died xD
              </p>
            )}
            <button
              className="p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%]"
              onClick={() => {
                setRerender(!rerender);
              }}
            >
              Collect
            </button>
          </>
        )}
      </div>
    </div>
  );
};
