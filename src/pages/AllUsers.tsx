import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

interface User {
  username: string;
  email: string;
  role: string;
}

export const AllUsers: React.FC = () => {
  const [allUser, setAllUser] = useState<User[]>([]);
  const [isOpenUserModals, setIsOpenUserModal] = useState<boolean>(false);
  const [updateUserInfo, setUpdateUserInfo] = useState<User>(null);

  const fetchAllUserData = async (): Promise<void> => {
    try {
      const response = await fetch(SummaryApi.getAllUsers.url, {
        method: SummaryApi.getAllUsers.method,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        console.log();
        setAllUser(result.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const onCloseModal = () => {
    setIsOpenUserModal(false);
  };

  console.log(allUser);

  return (
    <>
      <h3 className="text-center font-bold text-xl mb-5">All User's</h3>
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-gray-300 px-10 py-2">Sr</th>
            <th className="border border-gray-300 px-10 py-2">Username</th>
            <th className="border border-gray-300 px-10 py-2">Email</th>
            <th className="border border-gray-300 px-10 py-2">Role</th>
            <th className="border border-gray-300 px-10 py-2">Create Date</th>
            <th className="border border-gray-300 px-10 py-2">Action</th>
          </tr>
        </thead>
        {allUser.length > 0 &&
          allUser?.map((item, index) => {
            return (
              <tbody className="bg-white">
                <tr>
                  <td className="border border-gray-300 text-center px-10 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 text-center px-10 py-2">
                    {item?.username}
                  </td>
                  <td className="border border-gray-300 text-center px-10 py-2">
                    {item?.email}
                  </td>
                  <td className="border border-gray-300 text-center px-10 py-2">
                    {item?.role}
                  </td>
                  <td className="border border-gray-300 text-center px-10 py-2">
                    {moment(item?.createdAt).format("l")}
                  </td>
                  <td className="border border-gray-300 px-10 py-2">
                    <button
                      className="mx-auto block bg-green-200 p-2 rounded-full hover:bg-green-500 cursor-pointer"
                      onClick={() => {
                        setIsOpenUserModal(true);
                        setUpdateUserInfo(item);
                      }}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      {isOpenUserModals ? (
        <ChangeUserRole
          username={updateUserInfo?.username}
          email={updateUserInfo?.email}
          role={updateUserInfo?.role}
          onCloseModal={onCloseModal}
          fetchAllUserData={fetchAllUserData}
        />
      ) : null}
    </>
  );
};
