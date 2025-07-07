import React from "react";
import UsersComponent from "../users/UsersComponent";
import ReactionButtons from "./ReactionButtons";
import { deletePost, startEditing } from "./postsSlice";
import { useDispatch } from "react-redux";

const BlogCard = ({ id, title, content, userid, reaction }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative w-full max-w-[25rem] min-h-[300px] transition-transform duration-200 hover:scale-[1.015]">
      <div className="absolute -top-4 -right-2 flex gap-2 z-10">
        <button
          className="p-1 rounded-full bg-yellow-400 hover:bg-yellow-600 border border-none shadow-md"
          aria-label="Edit"
          onClick={() => dispatch(startEditing(id))}>
          ✏️
        </button>
        <button
          className="p-1 rounded-full bg-red-400 hover:bg-red-700 border border-none shadow-md"
          aria-label="Delete"
          onClick={() => dispatch(deletePost(id))}>
          ✖
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200 w-full h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 line-clamp-1 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-6 border border-none">
            {content}
          </p>
        </div>

        <div className="mt-auto flex flex-col border border-none">
          <ReactionButtons reaction={reaction} blogid={id} />

          <UsersComponent userid={userid} />

          <div className="flex justify-end">
            <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline hover:text-blue-800 transition">
              Visit Blog <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
