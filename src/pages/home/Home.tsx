import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import { FC } from "react";

export const Home: FC = () => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Link to={"/login"}>Login</Link>
      </div>
      <h1>Vite + React</h1>
    </>
  );
};
