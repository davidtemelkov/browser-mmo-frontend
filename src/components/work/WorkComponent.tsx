import { FC, useState } from "react";
import { IFetchedUser, IWork } from "../../services/user";
import { setWork } from "../../services/work";

interface WorkComponentProps {
  user: IFetchedUser;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkComponent: FC<WorkComponentProps> = ({
  user,
  rerender,
  setRerender,
}) => {
  const backgroundImageStyle = {
    backgroundImage: `url(https://i.pinimg.com/originals/8f/e4/72/8fe47283864b4bbeba9c21b20964f38b.jpg)`,
    backgroundSize: "cover",
  };
  const [selectedHours, setSelectedHours] = useState<number>(1);

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedHours(selectedValue);
  };

  const handleOkayClick = async () => {
    //TODO: Reward logic
    const workData: IWork = {
      Hours: selectedHours,
      Reward: selectedHours * 5,
    };

    await setWork(workData);
    setRerender(!rerender);
  };

  return (
    <div
      className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200 bg-opacity-60"
      style={backgroundImageStyle}
    >
      <div className="justify-start mt-[5%]">
        <h1 className="text-[2rem] font-semibold ">Work</h1>
      </div>
      {user.isQuesting ? (
        <div className="flex flex-col items-center justify-end mb-[15%] w-full text-[1.5rem]">
          {" "}
          You are currently questing
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-end mb-[3%] w-full">
            <p className="text-[1.25rem] font-semibold mb-[1%]">{`${selectedHours} hours selected`}</p>
            <p className="text-[0.75rem] font-semibold mb-[3%]">{`${
              selectedHours * 5
            } gold`}</p>
            <div className="relative w-[75%] border-2 border-black rounded-lg h-8">
              {[...Array(12).keys()].map((hour) => (
                <div
                  key={hour + 1}
                  className="absolute h-full border-l border-gray-500"
                  style={{
                    left: `${(hour + 1) * (100 / 12)}%`,
                  }}
                ></div>
              ))}
              <input
                type="range"
                min="1"
                max="12"
                value={selectedHours}
                onChange={handleHourChange}
                className="w-full h-full rounded-md bg-gray-700 appearance-none"
                style={{
                  background: `linear-gradient(to right, #FFF 0%, #FFF ${
                    selectedHours * (100 / 12)
                  }%, transparent ${selectedHours}%, transparent 100%)`,
                }}
              />
            </div>
            <style>
              {`
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0;  // Set width to 0 to hide the thumb
      }
    `}
            </style>

            <button
              className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%]"
              onClick={handleOkayClick}
            >
              Okay
            </button>
          </div>
        </>
      )}
    </div>
  );
};
