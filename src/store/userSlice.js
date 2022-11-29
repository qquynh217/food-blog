import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        fullName: "",
        username: "",
        pass: "",
        role: "",
        bio: "",
        avatar: "",
    },
    reducers: {
        userLogin: (state, action) => {
            state.isLogin = true
            state.fullName = action.payload.fullName
            state.username = action.payload.username
            state.role = action.payload.role
            state.bio = action.payload.bio
            state.avatar = action.payload.avatar
            state.pass = action.payload.pass
        },
        userLogout: (state, action) => {
            state.isLogin = false
            state.fullName = ""
            state.username = ""
            state.role = ""
            state.bio = ""
            state.avatar = ""
            state.pass = ""
        },
        changePassword: (state, action) => {
            state.pass = action.payload
        },
        changeInfo: (state, action) => {
            state.fullName = action.payload.fullName
            state.bio = action.payload.bio
            state.avatar = action.payload.avatar
        }
    }
})
export const { userLogin, userLogout, changePassword, changeInfo } = userSlice.actions
export default userSlice.reducer