import { FC } from "react";

export const Quest: FC = () => {
  return (
    <div className="flex flex-col w-[100%] h-[100%] justify-between items-center bg-blue-200">
      <div className="justify-start mt-[5%]">
        <h1 className="text-[2rem] font-semibold ">Quest</h1>
      </div>

      <div className="flex flex-col items-center justify-end mb-[3%] w-full">
        <p className="text-[1.25rem] font-semibold mb-[3%]">10:50 remaining</p>
        <div className="w-[75%] h-6 rounded-md dark:bg-gray-700 ">
          <div className="h-6 rounded-md dark:bg-blue-500 w-[45%] "></div>
        </div>
        <button
          className="btn p-1 my-5 border-2 rounded-md bg-gray-300 mt-[5%] "
          onClick={() => {}}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
