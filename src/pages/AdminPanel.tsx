import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

export const AdminPanel: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userDetails);
  return (
    <div className="min-h-[calc(100vh-70px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-md">
        <div className="bg-gray-100 h-50 flex justify-center items-center flex-col">
          <div className="text-7xl text-blue-700 cursor-pointer">
            <FaRegUserCircle />
          </div>
          <p className="text-xl font-semibold capitalize">
            {userInfo?.username}
            <span className="text-xs font-semibold ml-1">
              ({userInfo.role})
            </span>
          </p>
          <p className="text-md font-semibold ">{userInfo?.email}</p>
        </div>

        {/* navigation */}
        <div className="mt-10">
          <nav className="grid">
            <Link
              to={"all-users"}
              className="py-2 px-1 hover:bg-slate-100 font-medium"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="py-2 px-1 hover:bg-slate-100 font-medium"
            >
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
