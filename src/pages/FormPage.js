import React, { useEffect, useState } from "react";
import {
  postAdded,
  updatePost,
  fetechPosts,
  selectAllPosts,
  selectCurrentStatus,
} from "../features/posts/postsSlice";

import { nanoid } from "@reduxjs/toolkit";
import { selectAllUsers } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Formpage = () => {
  // Form states
  const [title, setTitle] = useState("");
  const [userid, setUserId] = useState(0);
  const [content, setContent] = useState("");

  // Redux selectors
  const allUsers = useSelector(selectAllUsers);
  const editPostData = useSelector(selectAllPosts);
  const postCurrentStatus = useSelector(selectCurrentStatus);
  const editData = useSelector((state) => state.posts.editData);

  // Redux dispatcher & other hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let postEdition = false;

  useEffect(() => {
    if (postCurrentStatus === "idle") {
      dispatch(fetechPosts());
    }
  }, [postCurrentStatus, dispatch]);

  if (editData.id) {
    postEdition = editPostData.find(
      (currentPost) => currentPost.id === editData.id
    );
  }

  useEffect(() => {
    if (postEdition) {
      setTitle(postEdition.title);
      setContent(postEdition.content);
      setUserId(postEdition.userid);
    }
  }, [postEdition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postEdition) {
      dispatch(postAdded({ id: nanoid(), title, content, userid }));
    } else {
      dispatch(updatePost({ title, content, userid }));
      postEdition = false;
    }
    setTitle("");
    setContent("");
    setUserId("");
    navigate("/");
  };

  const userOption = allUsers.map(({ name, id }, idx) => (
    <option value={id} key={`${id}-${idx}`}>
      {name}
    </option>
  ));

  const saveConditon = () => {
    return !title.trim() || !content.trim() || !userid ? true : false;
  };

  return (
    <div className=" rounded-3xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 h-[88vh] max-w-[1000px] m-auto flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-3xl w-full border border-white p-6 lg:p-8 flex flex-col gap-4 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          {postEdition ? "Update Post" : "Create a Blog Post"}
        </h1>

        <label className="flex flex-col text-gray-800 font-medium text-sm">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </label>

        <label className="flex flex-col text-gray-800 font-medium text-sm">
          Select User
          <select
            name="users"
            id="options"
            required
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
            <option value="">-- Select a user --</option>
            {userOption}
          </select>
        </label>

        <label className="flex flex-col text-gray-800 font-medium text-sm">
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            className="mt-1 px-4 py-2 border border-gray-300 rounded-xl bg-white/70 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required></textarea>
        </label>

        <button
          type="submit"
          className={`mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-xl text-lg shadow-md transition-all duration-300  self-center px-3 ${
            saveConditon() ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={saveConditon()}>
          {postEdition ? "Update Post" : "Submit Post"}
        </button>
      </form>
    </div>
  );
};

export default Formpage;
