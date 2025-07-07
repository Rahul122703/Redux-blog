import React, { useEffect, useState } from "react";
import {
  postAdded,
  updatePost,
  fetechPosts,
  selectAllPosts,
  selectErrorMessage,
  selectCurrentStatus,
} from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllUsers } from "../users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const PostForm = () => {
  // Form states
  const [title, setTitle] = useState("");
  const [userid, setUserId] = useState(0);
  const [content, setContent] = useState("");

  // Redux selectors
  const allUsers = useSelector(selectAllUsers);
  const editPostData = useSelector(selectAllPosts);
  const postErrorMessage = useSelector(selectErrorMessage);
  const postCurrentStatus = useSelector(selectCurrentStatus);
  const editData = useSelector((state) => state.posts.editData);

  // Redux dispatcher
  const dispatch = useDispatch();
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
    <div className=" bg-gray-100 flex items-center justify-center px-4 lg:w-[35%] w-full h-full p-8 border border-none">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl w-full border border-gray-300 flex flex-col p-4">
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
          {postEdition ? "Update Post" : "Submit Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
