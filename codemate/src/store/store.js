import {configureStore} from "@reduxjs/toolkit"
import signupSlice from "./signupSlice"
import userProfileSlice from "./userProfileSlice"
import feedSlice from "./feedSlice"
import allRequestSlice from "./requestSlice"
import connectionSlice from "./connectionSlice"
import toggleSlice from "./toggleSlice"

const store = configureStore({
    reducer:{
        "signupUser":signupSlice,
        "profileData":userProfileSlice,
        "feed":feedSlice,
        "allRequest":allRequestSlice,
        "myConnection":connectionSlice,
        "toggle":toggleSlice

    }
})
export default store