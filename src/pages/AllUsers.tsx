import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import type { IUser } from "../types/User";

export const AllUsers: React.FC = () => {
  const [allUser, setAllUser] = useState<IUser[]>([]);
  const [isOpenUserModals, setIsOpenUserModal] = useState<boolean>(false);
  const [updateUserInfo, setUpdateUserInfo] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllUserData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(SummaryApi.getAllUsers.url, {
        method: SummaryApi.getAllUsers.method,
        credentials: "include",
      });
      const result = await response.json();
      setAllUser(result.users);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const onCloseModal = () => {
    setIsOpenUserModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

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
        <tbody className="bg-white">
          {allUser.length > 0 &&
            allUser?.map((item, index) => {
              return (
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
              );
            })}
        </tbody>
      </table>
      {isOpenUserModals && updateUserInfo && (
        <ChangeUserRole
          username={updateUserInfo?.username}
          email={updateUserInfo?.email}
          role={updateUserInfo?.role}
          onCloseModal={onCloseModal}
          fetchAllUserData={fetchAllUserData}
        />
      )}
    </>
  );
};
