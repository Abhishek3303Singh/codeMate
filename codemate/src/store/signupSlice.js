import {createSlice} from "@reduxjs/toolkit"
export const STATUSES = Object.freeze({
    IDLE:"idle",
    SUCCESS: "success",
    LOADING: "loading",
    ERROR: "error",
  }); 

  const signupSlice = createSlice({
    name:"signupUser",
    initialState:{
        user:{},
        status:STATUSES.IDLE,
        isAuthenticated:false,
        resError:false,
    },
    reducers:{
        setInitializeState(state){
            state.status = STATUSES.LOADING,
            state.isAuthenticated = false,
            state.resError= false
        },
        setStatus(state, action){
            state.status=action.payload
        },
        setUser(state, action){
            state.user = action.payload
        },
        setAuthentication(state, action){
            state.isAuthenticated = action.payload
        },
        setError(state, action){
            state.resError = action.payload
        }
    }

  })

  export const {
    setInitializeState, setStatus, setAuthentication, setUser, setError
  } = signupSlice.actions

  export default signupSlice.reducer


  // thunk for signup

  export function signup(firstName, lastName, contact, email,password){
    return async function signupThunk(dispatch, getState){
        dispatch(initializeSignupState());
        // dispatch(setStatus(STATUSES.LOADING))
        // dispatch(setAuthentication(false))
        // dispatch(setError(false))
        try{
            let signupResponse = await fetch("http://localhost:118/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json"
                },
                body:JSON.stringify({

                    firstName:firstName,
                    lastName:lastName,
                    contact:contact,
                    email:email,
                    password:password
                    

                })
            })

            const data = await signupResponse.json()
            dispatch(setUser(data))
            if(signupResponse.ok && data.status=="success"){
                dispatch(setAuthentication(true))
            }
            else{
                dispatch(setError(true))
                dispatch(setAuthentication(false))
            }
            dispatch(setStatus(STATUSES.SUCCESS))

        }catch(err){
            console.log(err.message)
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setUser(null))
            dispatch(setAuthentication(false))
            dispatch(setError(true))
        }
    }
  }