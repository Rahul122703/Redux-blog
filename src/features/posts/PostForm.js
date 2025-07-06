import React, { useState } from "react";

import { postAdded } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllUsers } from "../users/usersSlice";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userid, setUserId] = useState(0);
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.clear();
    dispatch(postAdded({ id: nanoid(), title, content, userid }));
    setTitle("");
    setContent("");
    setUserId("");
  };
  const userOption = allUsers.map((currentUser) => {
    const { name, id } = currentUser;

    return (
      <option value={id} key={id}>
        {name}
      </option>
    );
  });

  const saveConditon = () => {
    return !title.trim() || !content.trim() || !userid ? true : false;
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-4 lg:w-[40%] w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8  w-full border border-gray-300 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create a Blog Post
        </h1>

        <label className="flex flex-col text-gray-700 font-semibold">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="mt-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </label>
        <label className="flex flex-col text-gray-700 font-semibold">
          Select User
          <select
            name="users"
            id="options"
            required
            value={userid}
            onChange={(e) => setUserId(e.target.value)}>
            <option value="">-- Select a user --</option>
            {userOption}
          </select>
        </label>
        <label className="flex flex-col text-gray-700 font-semibold">
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            className="mt-1 px-4 py-2 border border-gray-400 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required></textarea>
        </label>

        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-xl transition text-lg"
          disabled={saveConditon()}>
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
