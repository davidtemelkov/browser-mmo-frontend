import { FC, useMemo, useState } from "react";
import { IFetchedUser } from "../../services/user";
import { cancelCurrentQuest } from "../../services/quest";

interface CurrentQuestProps {
  user: IFetchedUser;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CurrentQuest: FC<CurrentQuestProps> = ({
  user,
  rerender,
  setRerender,
}) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${user.currentQuest.CurrentQuest.ImageURL})`,
    backgroundSize: "cover",
  };

  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isLoading, SetIsLoading] = useState<boolean>(true);

  useMemo(() => {
    const questingUntilTime = new Date(user.questingUntil).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = questingUntilTime - currentTime;

    // Update the remaining time every second
    const interval = setInterval(() => {
      const newRemainingTime = Math.max(
        0,
        timeDifference - (Date.now() - currentTime)
      );
      setRemainingTime(newRemainingTime);

      // Check if remaining time is 0 and call setRerender(!rerender)
      if (newRemainingTime === 0) {
        clearInterval(interval); // Stop the interval after reaching 00:00
        setRerender(!rerender);
      }

      SetIsLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [user.questingUntil]);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor(ms / (1000 * 60));
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const questTimeParts = user.currentQuest.CurrentQuest.Time.split(" ");
  const totalQuestTimeInMinutes = parseInt(questTimeParts[0], 10);

  const progressBarStyle = {
    width: `${
      ((totalQuestTimeInMinutes * 60 * 1000 - remainingTime!) /
        (totalQuestTimeInMinutes * 60 * 1000)) *
      100
    }%`,
  };

  return (
    <div className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200 bg-opacity-60">
      <div
        className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200"
        style={backgroundImageStyle}
      >
        <div className="justify-start mt-[5%]">
          <h1 className="text-[2rem] font-semibold ">
            {user.currentQuest.CurrentQuest.Name}
          </h1>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-end mb-[3%] w-full">
            <p className="text-[1.25rem] font-semibold mb-[3%]">Calculating</p>
            <button
              className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%] "
              onClick={async () => {
                await cancelCurrentQuest();
                setRerender(!rerender);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-end mb-[3%] w-full">
            <p className="text-[1.25rem] font-semibold mb-[3%]">
              {remainingTime !== null
                ? formatTime(remainingTime) + " remaining"
                : ""}
            </p>
            <div className="w-[75%] h-6 rounded-md dark:bg-gray-700 relative">
              <div
                className="h-6 rounded-md dark:bg-blue-500 absolute left-0"
                style={progressBarStyle}
              ></div>
            </div>
            <button
              className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%] "
              onClick={async () => {
                await cancelCurrentQuest();
                setRerender(!rerender);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
