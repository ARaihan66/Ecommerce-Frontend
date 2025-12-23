import { IoMdClose } from "react-icons/io";
import UserRole from "../common/userRole";
import type React from "react";
import { useState } from "react";
import SummaryApi from "../common";
import toast from "react-hot-toast";

interface ChangeUserRoleProps {
  username: string;
  email: string;
  role: string;
  onCloseModal: () => void;
}

const ChangeUserRole = ({
  username,
  email,
  role,
  onCloseModal,
  fetchAllUserData,
}: ChangeUserRoleProps) => {
  const [userRole, setUserRole] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLOptionElement>) => {
    setUserRole(event.target.value);
  };

  const handleOnChangeUserRole = async () => {
    const response = await fetch(SummaryApi.updateUserRole.url, {
      method: SummaryApi.updateUserRole.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userRole: userRole, email: email }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      onCloseModal();
      fetchAllUserData();
    } else {
      toast.error(result.message);
    }

    console.log(result);
  };

  return (
    <div className="fixed z-10 top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-slate-200/90">
      <div className="bg-white max-w-md w-full shadow rounded-lg relative py-3">
        <IoMdClose
          className="absolute right-[5%] top-[5%] text-xl cursor-pointer hover:text-gray-400"
          onClick={onCloseModal}
        />
        <h3 className="text-center font-medium text-xl">Change User Role</h3>
        <hr className="my-2" />
        <div className="px-10 py-5">
          <p>
            <span className="font-medium">Username :</span> {username}
          </p>
          <p>
            <span className="font-medium">Email : </span>
            {email}
          </p>
          <div className="flex gap-5">
            <p className="font-medium">Role :</p>
            <select
              value={role}
              className="outline-none max-w-32 w-full bg-slate-200 py-1 px-2 rounded"
              onChange={handleOnChange}
            >
              {Object.entries(UserRole).map(([label, value]) => {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          className="mx-auto block my-5 bg-red-400 px-3 py-2 rounded-full font-medium hover:bg-red-500 cursor-pointer"
          onClick={handleOnChangeUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
