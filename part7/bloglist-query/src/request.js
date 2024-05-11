import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'
const userBaseUrl = 'http://localhost:3003/api/users'
let token = null

export const getBlogs = async () => await axios.get(baseUrl).then(res => res.data)

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const createBlog = async newObject => {
  console.log('token', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const updateLike = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('id', id)
  console.log('newblog', newObject)
  return request.then(response => {
    console.log('response', response.data)
    return response.data})
}

export const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export const addComment = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
  return request.then(response => {
    return response.data
  })
}

export const getUserDetails = async () => await axios.get(userBaseUrl).then(res => res.data)