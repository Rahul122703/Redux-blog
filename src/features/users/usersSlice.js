import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: "1", name: "Rahul" },
    { id: "2", name: "Prashik" },
    { id: "3", name: "Shivam" },
    { id: "4", name: "Monis" },
    { id: "5", name: "Amit" },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
});

export const selectAllUsers = (state) => state.users.users;
export default usersSlice.reducer;
