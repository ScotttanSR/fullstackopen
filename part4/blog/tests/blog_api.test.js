const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('blog api test', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('to identifyblog posts is named id', async () => {
        const blogsAtEnd = await helper.blogsInDb()
    
        blogsAtEnd.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
    
    test('a valid blog can be added', async () => {
        const user = { username: 'root', password: 'sekret' }
        const loginResponse = await api.post('/api/login').send(user)
        const userDetails = loginResponse.body
        const newBlog = {
            title: 'test new blog',
            author: 'Wai Chee Tan',
            url: 'www.examp222le123.com',
            likes: 2,
            userId: userDetails.id
        }
       
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userDetails.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('test new blog')
    })

    test('adding blog fails if token not provided', async () => {
        const newBlog = {
            title: 'test new blog',
            author: 'Wai Chee Tan',
            url: 'www.examp222le123.com',
            likes: 2,
        }

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        
        expect(result.body.error).toContain('Unauthorize Token')
    })
    
    test ('new blog added without likes will be value 0', async () => {
        const user = { username: 'root', password: 'sekret' }
        const loginResponse = await api.post('/api/login').send(user)
        const userDetails = loginResponse.body
        const newBlog = {
            title: 'without likes',
            author: 'Tan',
            url: 'www.123.com',
            userId: userDetails.id
        }
        
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userDetails.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        const createdBlog = blogsAtEnd.find(blog => blog.title === 'without likes')
        expect(createdBlog.likes).toBe(0);
    
    })
    
    test ('new blog without title or url properties is not added', async () => {
        const user = { username: 'root', password: 'sekret' }
        const loginResponse = await api.post('/api/login').send(user)
        const userDetails = loginResponse.body
        const newBlogWithoutTitle = {
            author: 'Tan',
            url: 'www.123.com',
            likes: 1,
            userId: userDetails.id
        }
    
        const newBlogWithoutUrl = {
            title: 'without Url',
            author: 'Tan',
            likes: 1,
            userId: userDetails.id
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userDetails.token}`)
            .send(newBlogWithoutTitle)
            .expect(400)
    
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userDetails.token}`)
        .send(newBlogWithoutUrl)
        .expect(400)
    })
    
    test ('deletion of a blog.', async () => {
        const user = { username: 'root', password: 'sekret' }
        const loginResponse = await api.post('/api/login').send(user)
        const userDetails = loginResponse.body
        const newBlog = {
            title: 'blog to delete',
            author: 'Chee Tan',
            url: 'www.exam22p222le123.com',
            likes: 2,
            userId: userDetails.id
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userDetails.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart.find(blog => blog.title === 'blog to delete')
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${userDetails.token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).not.toContain(blogToDelete.title)
    })
    
    test ('update a blog likes.', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToUpdate = {...blogAtStart[0], likes: blogAtStart[0].likes + 1}   
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(201)
    
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(blog => blog.title === blogToUpdate.title)
        expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
    })
})

describe('user api test', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'hellor',
            password: 'hello'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails wit proper statuscode and message if username less than 3 character', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'hellor',
            password: 'hello'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username missing or length must more than 3')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})



afterAll(async () => {
    await mongoose.connection.close()
  })