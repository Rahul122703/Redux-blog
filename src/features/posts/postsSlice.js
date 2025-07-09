import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://dummyjson.com/posts";

const initialState = {
  posts: [],
  error: null,
  status: "idle",
  editData: { id: null, editing: false },
};

export const fetechPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const {
    data: { posts },
  } = await axios(POSTS_URL);
  return posts;
});

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
          userid: Number(userid),
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
      const { title, content, userid } = action.payload;
      state.posts.forEach((post) => {
        if (post.id === state.editData.id) {
          if (title) post.title = title;
          if (content) post.content = content;
          if (userid) post.userid = Number(userid);
        }
      });

      state.editData = { id: null, editing: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetechPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetechPosts.fulfilled, (state, action) => {
      state.status = "success";
      const tempData = action.payload.map((currentItem) => {
        const { id, title, body, userId } = currentItem;
        return {
          id,
          title,
          content: body,
          userid: userId,
          reaction: {
            like: 0,
            smile: 0,
            love: 0,
            link: 0,
            coffee: 0,
          },
        };
      });
      state.posts = state.posts.concat(tempData);
    });
    builder.addCase(fetechPosts.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectCurrentStatus = (state) => state.posts.status;
export const selectErrorMessage = (state) => state.posts.error;
export const selectSinglePost = (id) => (state) =>
  state.posts.posts.find((post) => post.id === id);

export const { postAdded, addReaction, deletePost, startEditing, updatePost } =
  postsSlice.actions;

export default postsSlice.reducer;

// HERE NOTE
// // 1. Import createAsyncThunk from Redux Toolkit
// import { createAsyncThunk } from "@reduxjs/toolkit";

// // 2. Define the async thunk
// // The first argument is a string used as a prefix for action types.
// // The second argument is an async function that returns a promise.
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const res = await fetch("https://dummyjson.com/posts");
//   const data = await res.json();
//   return data.posts; // This will be used in the fulfilled case
// });

// Now in your postsSlice:
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchPosts } from "./postsAPI"; // assume you created thunk in this file

// const initialState = {
//   posts: [],
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     // your sync reducers like addPost, deletePost etc.
//   },
//   // 3. Handle lifecycle actions of createAsyncThunk
//   extraReducers: (builder) => {
//     builder
//       // Triggered when the fetchPosts request starts
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = "loading";
//       })

//       // Triggered when the request succeeds
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.posts = action.payload; // fetched posts stored in state
//       })

//       // Triggered when the request fails
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message; // store the error message
//       });
//   },
// });

// export default postsSlice.reducer;
