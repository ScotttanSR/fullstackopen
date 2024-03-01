const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
        title: 'Handsome boy',
        author: 'Scott Tan',
        url: 'www.example.com',
        likes: 3
    },
    {
        title: 'Scott very handsome',
        author: 'Wai Chee',
        url: 'www.example123.com',
        likes: 1
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }


module.exports = {
    initialBlogs, blogsInDb, usersInDb
}