import React, { useEffect } from "react";

import PostsList from "../features/posts/PostsList";
import { useSelector } from "react-redux";
import { selectCurrentStatus } from "../features/posts/postsSlice";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { fetechPosts } from "../features/posts/postsSlice";
const HomePage = () => {
  const postCurrentStatus = useSelector(selectCurrentStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postCurrentStatus === "idle") {
      dispatch(fetechPosts());
    }
  }, [postCurrentStatus, dispatch]);
  return (
    <div className="flex flex-row flex-wrap">
      {postCurrentStatus === "loading" ? (
        <Loader />
      ) : (
        <PostsList error={postCurrentStatus} />
      )}
    </div>
  );
};

export default HomePage;
