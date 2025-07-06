import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import BlogCard from "./BlogCard";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const allPosts = posts.map((post, index) => (
    <BlogCard {...post} key={index} />
  ));
  return (
    <div className="bg-gray-100 p-6 flex flex-row gap-6 items-center w-full flex-wrap justify-center">
      {allPosts}
    </div>
  );
};

export default PostsList;
