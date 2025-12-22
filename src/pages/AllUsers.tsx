import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

export const AllUsers: React.FC = () => {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUserData = async () => {
    const response = await fetch(SummaryApi.getAllUsers.url, {
      method: SummaryApi.getAllUsers.method,
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      console.log();
      setAllUser(result.users);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  console.log(allUser);

  return (
    <>
      <h3 className="text-center">All User's</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-10 py-2">Sr</th>
            <th className="border border-gray-300 px-10 py-2">Username</th>
            <th className="border border-gray-300 px-10 py-2">Email</th>
            <th className="border border-gray-300 px-10 py-2">Role</th>
          </tr>
        </thead>
        {allUser.length > 0 &&
          allUser?.map((item, index) => {
            return (
              <tbody className="bg-white">
                <tr>
                  <td className="border border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300  text-center">
                    {item?.username}
                  </td>
                  <td className="border border-gray-300  text-center">
                    {item?.email}
                  </td>
                  <td className="border border-gray-300  text-center">
                    {" "}
                    {item?.role}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </>
  );
};
