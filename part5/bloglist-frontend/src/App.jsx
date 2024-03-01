import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogform'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      const blogToShow = blogs.filter(blog => blog.user.username===user.name)
      setFilteredBlogs(blogToShow)
    }
  }, [blogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const blogToShow = blogs.filter(blog => blog.user.username===user.name)
      setFilteredBlogs(blogToShow)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setIsError(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setFilteredBlogs(filteredBlogs.concat({ ...returnedBlog, user: { name: user.name, username: user.username, id: returnedBlog.user } }))
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setIsError(true)
      })
  }

  const updateLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(updatedBlog => {
        setFilteredBlogs(filteredBlogs.map((blog) => {
          if (blog._id === updatedBlog._id) {
            return { ...updatedBlog, user: { name: user.name, username: user.username, id: updatedBlog.user } }
          }
          return blog
        }))
      })
  }

  const deleteSelectedBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then((res) => {
        setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== id))
      })
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} isError={isError}/>
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <h2>Create new</h2>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {filteredBlogs.sort((a, b) => b.likes - a.likes).map(blog => (
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteSelectedBlog} />
          ))}

        </>
      ) : (
        LoginForm()
      )}
    </div>
  )
}

export default App