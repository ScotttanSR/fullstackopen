/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogform'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { signIn, signOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user2 = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
  }, [user2])

  useEffect(() => {
    if (user) {
      const blogToShow = blogs.filter(blog => blog.user.username===user.name)
      setFilteredBlogs(blogToShow)
    }
  }, [blogs])

  const handleLogin2 = async (event) => {
    event.preventDefault()
    try {
      await dispatch(signIn(username, password))
      setUsername('')
      setPassword('')
      const blogToShow = blogs.filter(blog => blog.user.username===user2.name)
      setFilteredBlogs(blogToShow)
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
      setIsError(false)
    }
  }

  const handleLogout2 = async () => {
    await dispatch(signOut());
    setUser(null)
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
    <form onSubmit={handleLogin2} id='loginForm'>
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
      <Notification isError={isError}/>
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout2}>logout</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <h2>Create new</h2>
            <BlogForm user={user}/>
          </Togglable>

          {/* {filteredBlogs.sort((a, b) => b.likes - a.likes).map(blog => (
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteSelectedBlog} />
          ))} */}
          <Blog user={user} dispatch={dispatch}/>
        </>
      ) : (
        LoginForm()
      )}
    </div>
  )
}

export default App