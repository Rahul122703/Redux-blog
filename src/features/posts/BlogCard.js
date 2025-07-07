import React from "react";
import UsersComponent from "../users/UsersComponent";
import ReactionButtons from "./ReactionButtons";
import { deletePost, startEditing } from "./postsSlice";
import { useDispatch } from "react-redux";

const BlogCard = ({ id, title, content, userid, reaction }) => {
  const dispatch = useDispatch();

  return (
    <div
      key={id}
      className="relative bg-white shadow-lg rounded-xl p-6 border border-gray-300 w-full max-w-[25rem] min-h-[320px] flex flex-col justify-between">
      <button
        className="p-1 rounded-full absolute bg-red-400 hover:bg-red-700 border border-black top-2 right-2"
        aria-label="Delete"
        onClick={() => dispatch(deletePost(id))}>
        ✖
      </button>

      <button
        className="p-1 rounded-full absolute bg-yellow-400 hover:bg-yellow-600 border border-black top-2 right-12"
        aria-label="Edit"
        onClick={() => dispatch(startEditing(id))}>
        ✏️
      </button>

      <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{title}</h2>

      <p className="text-gray-600 mt-2 line-clamp-3">{content}</p>

      <ReactionButtons blogid={id} reaction={reaction} />

      <UsersComponent userid={userid} />
    </div>
  );
};

export default BlogCard;
