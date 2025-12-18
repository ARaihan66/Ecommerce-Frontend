import { useState } from "react";
import signInIcon from "../asset/signin.gif";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="w-full bg-white max-w-md mx-auto rounded-md py-7 px-5">
          <img
            src={signInIcon}
            alt="signin icon"
            className="w-20 h-20 mx-auto"
          />
          <form>
            <label htmlFor="email">Email</label>
            <div className="bg-slate-100 rounded-md">
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="bg-slate-100 rounded-md flex items-center pr-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
              <div
                className="text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="hover:underline hover:text-red-600 text-right block"
            >
              Forgot password
            </Link>
            <button
              type="submit"
              className="max-w-37.5 w-full mt-5 bg-amber-600 py-2 rounded-full text-white cursor-pointer hover:scale-110 transition-all mx-auto block"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-2">
            Don't have an account?
            <span className="hover:underline hover:text-red-700 ml-2">
              <Link to={"/sign-in"}>Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
