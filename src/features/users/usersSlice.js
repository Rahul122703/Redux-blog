import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const USER_URL = "https://dummyjson.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const {
    data: { users },
  } = await axios(USER_URL);
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const tempUsers = action.payload.map((currentUser) => {
        const { id, firstName, lastName } = currentUser;
        return { id, name: `${firstName} ${lastName}` };
      });
      state.users = state.users.concat(tempUsers);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;
export default usersSlice.reducer;
