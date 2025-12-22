import { createSlice } from "@reduxjs/toolkit";

// export interface user {
//   username: string;
//   email: string;
//   profilePic: string;
// }

const initialState = {
  userDetails: Object,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    SetUserDetails: (state, action) => {
      console.log(state);
      console.log(action.payload);
      state.userDetails = action.payload;
      //   state.username = action.payload.username;
      //   state.email = action.payload.email;
      //   state.profilePic = action.payload.profilePic;
    },
  },
});

export const { SetUserDetails } = userSlice.actions;
export default userSlice.reducer;
