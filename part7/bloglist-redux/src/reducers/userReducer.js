import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login';
import blogService from '../services/blogs';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            console.log('state', action.payload);
            return action.payload;
        },
        cleanUser() {
            return null;
        },
    },
});

export const { setUser, cleanUser } = userSlice.actions;

export const signIn = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username, password,
          });
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user));
    }
}

export const signOut = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser');
        dispatch(cleanUser());
    }
}

export default userSlice.reducer;
