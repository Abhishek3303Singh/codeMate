import {configureStore} from "@reduxjs/toolkit"
import signupSlice from "./signupSlice"
import userProfileSlice from "./userProfileSlice"

const store = configureStore({
    reducer:{
        "signupUser":signupSlice,
        "profileData":userProfileSlice

    }
})
export default store