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

  //git status && git add . && git commit -m "adding new feature" && git push
  // setTimeout(() => {
  //   console.clear();
  // }, 500);

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
