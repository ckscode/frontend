import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem('name');


const initialState = {
 isLoggedIn:false,
 name:name? JSON.parse(name) : "",
 user:{
    name:"",
    email:"",
    phone:"",
    bio:"",
    photo:""  
 },
 userID:""
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        SET_LOGIN(state,action){
          state.isLoggedIn = action.payload
        },
        SET_NAME(state,action){
            state.name = action.payload
            localStorage.setItem('name',JSON.stringify(action.payload)) 
        },
        SET_USER(state,action){
            const profile = action.payload
            state.user.name= profile.name
            state.user.email= profile.email
            state.user.contact= profile.contact
            state.user.bio= profile.bio
            state.user.photo= profile.photo
        }
    },
})

export const {SET_LOGIN,SET_NAME,SET_USER} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export default authSlice.reducer;
