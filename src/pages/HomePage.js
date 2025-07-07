import React from "react";

import PostsList from "../features/posts/PostsList";
import { useSelector } from "react-redux";
import { selectCurrentStatus } from "../features/posts/postsSlice";
import Loader from "../components/Loader";
const HomePage = () => {
  const postCurrentStatus = useSelector(selectCurrentStatus);
  //git status && git add . && git commit -m "adding new feature" && git push
  // setTimeout(() => {
  //   console.clear();
  // }, 500);
  return (
    <div className="m-auto flex flex-col lg:flex-row justify-between">
      {postCurrentStatus === "loading" ? (
        <Loader />
      ) : (
        <PostsList error={postCurrentStatus} />
      )}
    </div>
  );
};

export default HomePage;
