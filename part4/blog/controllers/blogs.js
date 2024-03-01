const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User  = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1 , name:1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    console.log('user', user);
    if (user) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } else{
      response.status(401).json({error: 'Unauthorize Token'})
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  console.log('user', user);
  const blog  = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({error: 'Unauthorize User'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log('request user', request.user);
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter