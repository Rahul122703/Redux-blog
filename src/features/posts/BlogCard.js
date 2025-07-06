import React from "react";
import UsersComponent from "../users/UsersComponent";

const BlogCard = ({ id, title, content, userid }) => {
  return (
    <div
      key={id}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{content}</p>
      <div className="flex gap-4 mt-4 text-xl">
        <button className="hover:scale-110 transition">👍</button>
        <button className="hover:scale-110 transition">😊</button>
        <button className="hover:scale-110 transition">❤️</button>
        <button className="hover:scale-110 transition">🔗</button>
        <button className="hover:scale-110 transition">☕</button>
      </div>
      <UsersComponent userid={userid} />
    </div>
  );
};

export default BlogCard;
