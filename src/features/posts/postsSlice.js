import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  posts: [
    {
      id: 1,
      title: "Why React is Awesome",
      content:
        "React allows you to build complex UIs from small, isolated pieces of code called components.",
    },
    {
      id: 2,
      title: "Understanding Redux",
      content:
        "Redux helps you manage global state in a predictable way, great for larger apps.",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: function (state, action) {
      console.log("action.payload");
      console.log(action.payload);
      const postStoreFormat = (payload) => {
        const { title, content, userid } = payload;
        return {
          id: nanoid(),
          title,
          content,
          userid,
        };
      };
      state.posts.unshift(postStoreFormat(action.payload));
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
