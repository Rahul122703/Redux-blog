import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  posts: [
    {
      id: 1,
      title: "Why React is Awesome",
      content:
        "React allows you to build complex UIs from small, isolated pieces of code called components.",
      reaction: {
        like: 0,
        smile: 0,
        love: 0,
        link: 0,
        coffee: 0,
      },
    },
    {
      id: 2,
      title: "Understanding Redux",
      content:
        "Redux helps you manage global state in a predictable way, great for larger apps.",
      reaction: {
        like: 0,
        smile: 0,
        love: 0,
        link: 0,
        coffee: 0,
      },
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      const postStoreFormat = (payload) => {
        const { title, content, userid } = payload;
        return {
          id: nanoid(),
          title,
          content,
          userid,
          reaction: {
            like: 0,
            smile: 0,
            love: 0,
            link: 0,
            coffee: 0,
          },
        };
      };
      state.posts.unshift(postStoreFormat(action.payload));
    },
    addReaction: (state, action) => {
      const { key, blogid } = action.payload;

      state.posts.forEach((post) => {
        if (post.id === blogid) {
          post.reaction[key]++;
        }
      });
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
