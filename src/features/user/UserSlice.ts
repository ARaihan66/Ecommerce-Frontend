import { createSlice } from "@reduxjs/toolkit";

export interface user {
  username: string;
  email: string;
  profilePic: string;
}

const initialState: user = {
  username: "",
  email: "",
  profilePic: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    SetUserDetails: (state, action) => {
      console.log(state);
      console.log(action.payload);
    },
  },
});

export const { SetUserDetails } = userSlice.actions;
export default userSlice.reducer;
