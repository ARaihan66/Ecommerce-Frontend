import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import { SetUserDetails } from "../features/user/UserSlice";

export default function Header() {
  const userInfo = useSelector((state: RootState) => state.user.userDetails);
  const dispatch = useDispatch();
  console.log(userInfo);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const response = await fetch(SummaryApi.signOutUser.url, {
      method: SummaryApi.signOutUser.method,
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      dispatch(SetUserDetails(null));
      navigate("/log-in");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center justify-between px-4">
        <div>
          <Link to="/">E-Commerce</Link>
        </div>
        <div className="hidden lg:flex items-center max-w-sm justify-between border border-gray-400 rounded-full focus-within:shadow-md pl-5">
          <input
            type="text"
            placeholder="search product here...."
            className="outline-none w-full"
          />
          <div className="text-lg min-w-12.5 h-8 flex items-center justify-center rounded-r-full cursor-pointer bg-amber-600 text-white">
            <IoSearchOutline />
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="text-3xl text-blue-700">
            <FaRegUserCircle />
          </div>
          <div className="text-2xl relative">
            <span>
              <FaCartPlus />
            </span>
            <div className="text-sm bg-red-700 text-white flex justify-center items-center rounded-full w-5 h-5 absolute -top-3 -right-3">
              0
            </div>
          </div>
          <div>
            {userInfo && userInfo._id ? (
              <span
                className="bg-amber-800 px-3 py-1 rounded-full text-white font-medium cursor-pointer"
                onClick={handleLogOut}
              >
                Sign Out
              </span>
            ) : (
              <Link
                to="/log-in"
                className="bg-amber-800 px-3 py-1 rounded-full text-white font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
