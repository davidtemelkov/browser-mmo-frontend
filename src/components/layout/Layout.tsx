import { FC } from "react";
import { Navbar } from "../navbar";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex h-[97vh]">
        <main className="h-[100%] m-auto w-[100%]">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};
