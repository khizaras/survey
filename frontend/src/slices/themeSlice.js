import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#00eaff",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColor(state, action) {
      state.color = action.payload;
    },
  },
});

export const { setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
