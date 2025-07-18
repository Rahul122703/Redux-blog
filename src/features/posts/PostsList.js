import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import BlogCard from "../../components/BlogCard";

const PostsList = ({ error }) => {
  const posts = useSelector(selectAllPosts);
  console.log("posts");
  console.log(posts);
  if (error === "rejected") {
    return (
      <div className="flex items-center justify-center w-full h-full p-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Failed to Load Posts</h2>
          <p className="text-sm">
            Something went wrong while fetching the blog data. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 lg:p-4 flex flex-wrap gap-6 w-full justify-center">
      {posts.map((post, index) => (
        <BlogCard {...post} key={index} />
      ))}
    </div>
  );
};

export default PostsList;
