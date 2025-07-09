import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";

const UserPage = () => {
  const {
    state: { username, userid },
  } = useLocation();

  const navigate = useNavigate();
  const allBlogs = useSelector(selectAllPosts);

  const userBlog = allBlogs.filter(
    (currentItem) => currentItem.userid === userid
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{username}</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Showing {userBlog.length} blog{userBlog.length !== 1 ? "s" : ""}
      </p>

      {userBlog.length === 0 ? (
        <div className="text-gray-600 text-sm mb-6">
          No blogs found for this user.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {userBlog.map((post, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-gray-700 text-sm font-medium border border-black">
              {post.title}
              <div
                onClick={() =>
                  navigate("/blog", {
                    replace: true,
                    state: post.id,
                  })
                }
                className="mt-2 text-blue-500 text-xs hover:underline cursor-pointer">
                Visit →
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-10 px-4 py-2 text-sm border rounded-full text-gray-600 hover:bg-gray-100">
        ← Back
      </button>
    </div>
  );
};

export default UserPage;
