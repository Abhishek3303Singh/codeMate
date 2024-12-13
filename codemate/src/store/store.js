import {configureStore} from "@reduxjs/toolkit"
import signupSlice from "./signupSlice"
import userProfileSlice from "./userProfileSlice"
import feedSlice from "./feedSlice"
import allRequestSlice from "./requestSlice"

const store = configureStore({
    reducer:{
        "signupUser":signupSlice,
        "profileData":userProfileSlice,
        "feed":feedSlice,
        "allRequest":allRequestSlice

    }
})
export default store