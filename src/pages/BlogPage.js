import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UsersComponent from "../features/users/UsersComponent";
import ReactionButtons from "../components/ReactionButtons";
import { useSelector } from "react-redux";
import { selectSinglePost } from "../features/posts/postsSlice";
import { deletePost, startEditing } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";
const BlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const post = useSelector(selectSinglePost(location.state));

  const { id, title, content, userid, reaction } = post;

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 w-full p-8 flex flex-col gap-6 max-w-[1400px] m-auto">
      <div className="absolute -top-4 -right-2 flex gap-2 z-10">
        <button
          className="p-1 rounded-full bg-yellow-400 hover:bg-yellow-600 border border-none shadow-md"
          aria-label="Edit"
          onClick={() => {
            dispatch(startEditing(id));
            navigate("/form");
          }}>
          ✏️
        </button>
        <button
          className="p-1 rounded-full bg-red-400 hover:bg-red-700 border border-none shadow-md"
          aria-label="Delete"
          onClick={() => {
            dispatch(deletePost(id));
            navigate("/");
          }}>
          ✖
        </button>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-sm font-medium text-blue-700 hover:underline flex items-center gap-1">
          ← Back to Home
        </button>
        <UsersComponent userid={userid} />
      </div>

      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

      <p className="text-gray-800 leading-7 whitespace-pre-wrap">{content}</p>

      <div className="mt-4">
        <ReactionButtons blogid={id} reaction={reaction} />
      </div>
    </div>
  );
};

export default BlogPage;
