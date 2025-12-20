import React, { useState } from "react";
import signInIcon from "../asset/signin.gif";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router";
import toast from "react-hot-toast";
import SummaryApi from "../common";

interface SigninFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: File | null;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SigninFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { username, email, password, confirmPassword, profilePic } = formData;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, profilePic: file });

    setImagePreview(URL.createObjectURL(file));
  };

  const onFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match.");
      return;
    }

    const payload = new FormData();

    payload.append("username", username);
    payload.append("email", email);
    payload.append("password", password);

    if (profilePic) {
      payload.append("profilePic", profilePic);
    }

    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      body: payload,
    });

    const result = await response.json();

    if (result.status) {
      toast.success("User registered successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: null,
      });
      setImagePreview(null);
      return;
    } else {
      toast.error(result.message);
    }

    console.log(result);
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="w-full bg-white max-w-md mx-auto rounded-md py-7 px-5">
          <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
            <div className="relative rounded-full w-24 h-24 mx-auto overflow-hidden">
              <img src={imagePreview || signInIcon} alt="signin icon" />
              <label htmlFor="profileImage">
                <p className="text-xs opacity-70 bg-slate-200 text-center absolute bottom-0 left-0 right-0 w-full py-4 font-medium cursor-pointer">
                  Upload Photo
                </p>
                <input
                  id="profileImage"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <label htmlFor="username">Username</label>
            <div className="bg-slate-100 rounded-md">
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={handleOnChange}
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
            </div>
            <label htmlFor="email">Email</label>
            <div className="bg-slate-100 rounded-md">
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="bg-slate-100 rounded-md flex items-center pr-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleOnChange}
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
              <div
                className="text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <label htmlFor="confirmPassword"> Confirm Password</label>
            <div className="bg-slate-100 rounded-md flex items-center pr-2">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className="outline-none w-full h-9 bg-transparent pl-1"
              />
              <div
                className="text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <button
              type="submit"
              className="max-w-37.5 w-full mt-5 bg-amber-600 py-2 rounded-full text-white cursor-pointer hover:scale-110 transition-all mx-auto block"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-2">
            Already have an account?
            <span className="hover:underline hover:text-red-700 ml-2">
              <Link to={"/log-in"}>Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
