import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"


const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            return [...state, action.payload];
        },
        setBlog(state, action) {
            return action.payload
        },
        removeBlog(state, action) {
            const idToRemove = action.payload;
            return state.filter(blog => blog.id !== idToRemove);
        }
}
})

export const {appendBlog, setBlog, removeBlog} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlog(blogs))
    }
}

export const createBlog = (content, user) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        console.log('newblog res', newBlog);
        
        const newBlogWithUser = {...newBlog, user: {id: user.id, name: user.name, username: user.username}}
        dispatch(appendBlog(newBlogWithUser))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        blogService.deleteBlog(id)
        dispatch(removeBlog(id));
    }
}

export default blogSlice.reducer