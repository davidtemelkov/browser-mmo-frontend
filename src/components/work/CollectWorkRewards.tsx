import { FC, useEffect } from "react";
import { IFetchedUser } from "../../services/user";
import { collectWorkRewards } from "../../services/work";

interface CollectWorkRewardsProps {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectWorkRewards: FC<CollectWorkRewardsProps> = ({
  user,
  setUser,
  rerender,
  setRerender,
}) => {
  const backgroundImageStyle = {
    backgroundImage: `url(https://i.pinimg.com/originals/8f/e4/72/8fe47283864b4bbeba9c21b20964f38b.jpg)`,
    backgroundSize: "cover",
  };

  useEffect(() => {
    const fetchData = async () => {
      await collectWorkRewards();
    };

    setUser((prevUser) => ({
      ...prevUser,
      gold: prevUser.gold + +prevUser.currentQuest.CurrentQuest.Gold,
    }));

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200">
      <div
        className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200"
        style={backgroundImageStyle}
      >
        <div className="justify-start mt-[5%]">
          <h1 className="text-[2rem] font-semibold ">Work finished</h1>
        </div>

        <div className="flex flex-col items-center justify-end mb-[3%] w-full">
          <p className="text-[1.25rem] font-semibold mb-[3%]">
            You won {user.workReward} gold.
          </p>
          <button
            className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%] "
            onClick={() => {
              setRerender(!rerender);
            }}
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};
