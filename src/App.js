// import React from "react";

// import PostsList from "./features/posts/PostsList";
// import PostForm from "./features/posts/PostForm";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "./features/users/usersSlice";
// import { selectCurrentStatus } from "./features/posts/postsSlice";
// import Loader from "./components/Loader";
// const App = () => {
//   const dispatch = useDispatch();
//   dispatch(fetchUsers());
//   const postCurrentStatus = useSelector(selectCurrentStatus);
//   //git status && git add . && git commit -m "adding new feature" && git push
//   // setTimeout(() => {
//   //   console.clear();
//   // }, 500);
//   return (
//     <div className=" border border-none h-[100vh] max-w-[1800px] m-auto flex flex-col lg:flex-row justify-between ">
//       <PostForm />
//       <div className="border border-none overflow-auto w-full">
//         {postCurrentStatus === "loading" ? (
//           <Loader />
//         ) : (
//           <PostsList error={postCurrentStatus} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import FormPage from "./pages/FormPage";
import NotFound from "./pages/NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
