import { configureStore } from "@reduxjs/toolkit";
import pollsReducer from "./slices/pollsSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    polls: pollsReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;
