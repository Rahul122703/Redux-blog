import React from "react";

import PostsList from "./features/posts/PostsList";
import PostForm from "./features/posts/PostForm";
const App = () => {
  return (
    <div className=" border border-none h-[100vh] max-w-[1500px] m-auto flex flex-row justify-between">
      <PostForm />
      <div className=" border border-none overflow-auto w-full">
        <PostsList />
      </div>
    </div>
  );
};

export default App;
