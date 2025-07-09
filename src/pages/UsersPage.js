import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

import { replace, useNavigate } from "react-router-dom";
const USERS_PER_PAGE = 28;

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersData = useSelector(selectAllUsers);
  const totalPages = Math.ceil(usersData.length / USERS_PER_PAGE);
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = usersData.slice(start, start + USERS_PER_PAGE);

  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] m-auto max-w-[900px] bg-gray-50 flex flex-col items-center px-4 py-10 rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">All Users</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 rounded-full border text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40">
          Prev
        </button>
        <span className="text-gray-600 font-medium text-sm self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-1 rounded-full border text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40">
          Next
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            className="border border-black bg-white rounded-xl shadow-sm p-3 transition hover:shadow-md text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-medium">{user.name}</span>
              <div
                onClick={() => {
                  navigate("/user", {
                    replace: true,
                    state: { username: user.name, userid: user.id },
                  });
                }}
                className="ml-2 text-blue-500 text-xs hover:underline cursor-pointer"
                path="/user">
                Visit →
              </div>
              <span className="text-gray-500 text-xs">#{user.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
