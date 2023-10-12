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

    navigate("/profile");
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-10 py-24 px-20 md:grid-cols-1 md:py-20 md:px-10 md:gap-14 sm:py-10 sm:px-8">
        <div className="w-2/3 border-2 border-info px-7 py-5 mx-auto rounded-md sm:w-full">
          <form data-testid="form" onSubmit={handleLogin}>
            <h2 className="m-6 text-center text-2xl font-bold text-accent">
              Log in
            </h2>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={onChangeHandler}
              value={values["email"]}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={onChangeHandler}
              value={values["password"]}
            ></input>
            <button className="btn btn-secondary w-full my-5">Submit</button>

            <p className="text-center text-accent">
              Forgot{" "}
              <a href="" className="text-blue-500">
                Password?
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
    </>
  );
};
