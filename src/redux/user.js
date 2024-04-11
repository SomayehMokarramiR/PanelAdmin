import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { getItem } from '../@core/common/storage.services';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: "",
        email: "",
        password : '',
        name: "",
        phoneNumber : '',
        role: "",
        token : getItem('token') ? getItem('token') : null,
    },
    
    reducers: {
        onIdChange: (state, action) => {
            state.id = action.payload
        },
        onEmailChange: (state, action) => {
            state.email = action.payload
        },

        onPhoneNumberChange: (state, action) => {
            state.phoneNumber = action.payload
        },

        onPasswordChange: (state, action) => {
            state.password = action.payload
        },        

        onNameChange: (state, action) => {
            state.name = action.payload
        },

        onTokenChange: (state, action) => {
            state.token = action.payload
        },
        
        onRoleChange: (state, action) => {
            state.role = action.payload
        }, 
    },
});

export const {onEmailChange , onPhoneNumberChange , onPasswordChange , onTokenChange, onNameChange } = userSlice.actions; // common way

export const useUserSelector = () => useSelector(reducer => reducer.user) // costume hook

export default userSlice.reducer;