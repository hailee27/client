import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./reducer/cardReducer";
import loginReducer from "./reducer/loginReducer";
import profileReducer from "./reducer/profileReducer";
import registerReducer from "./reducer/registerReducer";
import userReducer from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    card: cardReducer,
  },
});

export default store;
