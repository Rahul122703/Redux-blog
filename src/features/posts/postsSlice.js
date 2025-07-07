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
  editData: { id: null, editing: false },
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
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (currentPost) => currentPost.id !== action.payload
      );
    },
    startEditing: (state, action) => {
      state.editData = { id: action.payload, editing: true };
    },
    updatePost: (state, action) => {
      console.log("action.payload");
      console.log(action.payload);
      const { title, content, userid } = action.payload;

      state.posts.forEach((post) => {
        console.log("matched!!!!");
        if (post.id === state.editData.id) {
          if (title) post.title = title;
          if (content) post.content = content;
          if (userid) post.userid = userid;
        }
      });

      state.editData = { id: null, editing: false };
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, addReaction, deletePost, startEditing, updatePost } =
  postsSlice.actions;

export default postsSlice.reducer;
