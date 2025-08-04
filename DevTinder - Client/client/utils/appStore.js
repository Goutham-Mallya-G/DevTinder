import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import feedSlice from "./Slice/feedSlice";

const appStore = configureStore({
    reducer : {
        user :  userSlice,
        feed : feedSlice,
    }
})

export default appStore;