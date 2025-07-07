import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";

const UsersComponent = ({ userid }) => {
  const allUsers = useSelector(selectAllUsers);
  const matchedUser = allUsers.find((currentUser) => currentUser.id === userid);
  const displayName = matchedUser ? matchedUser.name : "Unknown Author";

  return (
    <div className="flex items-center">
      <div className="text-sm">
        <p className="text-gray-800 font-semibold">{displayName}</p>
        <p className="text-gray-500">Author</p>
      </div>
    </div>
  );
};

export default UsersComponent;
