

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState:'null', 
    reducers: {
        notification: (state, action) => action.payload,
        removeNotification : () => 'null',
    }
})

export const {notification, removeNotification} = notificationSlice.actions
export const setNotification = (message, time) => {
    return async dispatch => {
        const second = time * 1000
      dispatch(notification(message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, second)
    }
  }
export default notificationSlice.reducer


