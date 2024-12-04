import {configureStore} from "@reduxjs/toolkit"
import signupSlice from "./signupSlice"

const store = configureStore({
    reducer:{
        "signupUser":signupSlice

    }
})
export default store