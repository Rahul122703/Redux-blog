import React from "react";
import UsersComponent from "../users/UsersComponent";
import ReactionButtons from "./ReactionButtons";

const BlogCard = ({ id, title, content, userid, reaction }) => {
  return (
    <div
      key={id}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{content}</p>
      <ReactionButtons blogid={id} reaction={reaction} />
      <UsersComponent userid={userid} />
    </div>
  );
};

export default BlogCard;
