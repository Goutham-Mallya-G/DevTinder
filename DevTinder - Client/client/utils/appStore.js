import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import feedSlice from "./Slice/feedSlice";
import connectionSlice from "./Slice/connectionSlice";

const appStore = configureStore({
    reducer : {
        user :  userSlice,
        feed : feedSlice,
        connection : connectionSlice,
    }
})

export default appStore;