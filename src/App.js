import React from "react";

import PostsList from "./features/posts/PostsList";
import PostForm from "./features/posts/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";
import { selectCurrentStatus } from "./features/posts/postsSlice";
import Loader from "./components/Loader";
const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchUsers());
  const postCurrentStatus = useSelector(selectCurrentStatus);

  // setTimeout(() => {
  //   console.clear();
  // }, 500);
  return (
    <div className=" border border-none h-[100vh] max-w-[1800px] m-auto flex flex-col lg:flex-row justify-between ">
      <PostForm />
      <div className="border border-none overflow-auto w-full">
        {postCurrentStatus === "loading" ? (
          <Loader />
        ) : (
          <PostsList error={postCurrentStatus} />
        )}
      </div>
    </div>
  );
};

export default App;
