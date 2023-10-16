import { FC, useState } from "react";
import { IValueLogin, login } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { ITokenPayload, decodeToken } from "../../utils/jwt";
import { saveToStorage } from "../../utils/localStorage";

export const Login: FC = () => {
  const [values, setValue] = useState<IValueLogin>({ email: "", password: "" });
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue((state) => ({ ...state, [e.target.name]: e.target.value }));

  const handleLogin = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const jwt = await login(values);
    saveToStorage("user", jwt);

    const decodeTokenData: ITokenPayload = await decodeToken();

    const name = decodeTokenData["name"];
    const email = decodeTokenData["email"];

    saveToStorage("name", name);
    saveToStorage("email", email);

    navigate(`/profile/${email}`);
  };

  return (
    <div className="bg-login bg-cover  flex justify-center w-[100%] h-[100%] text-white">
      <div className="flex justify-center items-center py-3">
        <form
          data-testid="form"
          onSubmit={handleLogin}
          className="border-2 rounded-md p-5 bg-black "
        >
          <h2 className="m-6 text-center text-2xl font-bold text-accent">
            Log in
          </h2>
          <label htmlFor="email">Email</label>
          <div className="m-1">
            {" "}
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={onChangeHandler}
              value={values["email"]}
              className="border-2 rounded-md p-1"
            ></input>
          </div>
          <label htmlFor="password">Password</label>
          <div className="m-1">
            {" "}
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={onChangeHandler}
              value={values["password"]}
              className="border-2 rounded-md p-1"
            ></input>
          </div>

          <button className="btn p-1 my-5 border-2 rounded-md" type="submit">
            Submit
          </button>

          <p className="text-center text-accent">
            <a href="" className="text-blue-500">
              Forgot Password?
            </a>
          </p>
          <p className="text-center text-accent">
            Don't have an account?
            <Link className="text-blue-500 m-1" to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
