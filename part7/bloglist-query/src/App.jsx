import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import BlogNew from './components/BlogNew'
import UserView from './components/UserView'
import UserBlogs from './components/Userblogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogform'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBlogs, setToken, getUserDetails } from './request'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'error':
    return { message: action.content }
  case 'clear':
    return { message: null }
  default:
    return state
  }
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  marginTop: 3,
}


const App = () => {
  const [notification, notifactionDispatch] = useReducer(notificationReducer, { message: null })
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  // const [blogs2, setBlogs2]= useState([])
  // const [usersDetails, setusersDetails] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  })

  const { data: blogs2, isLoading: blogsLoading } = result

  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: getUserDetails,
    refetchOnWindowFocus: false,
  })

  const { data: usersDetails, isLoading: usersLoading } = userResult

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
    // const result = useQuery({
    //   queryKey: ['blogs'],
    //   queryFn: getBlogs,
    //   refetchOnWindowFocus: false,
    // })
    // setBlogs2(result.data)
    // const userResult = useQuery({
    //   queryKey: ['users'],
    //   queryFn: getUserDetails,
    //   refetchOnWindowFocus: false,
    // })
    // setusersDetails(userResult.data)

  }, [])

  useEffect(() => {
    if (user && blogs2) {
      const blogToShow = blogs2.filter(blog => blog.user.username===user.name)
      setFilteredBlogs(blogToShow)
    }
  }, [blogs2, usersDetails, user])

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
      notifactionDispatch({ type: 'error', content: 'wrong username or password' })
      setIsError(false)
      setTimeout(() => {
        notifactionDispatch({ type: 'clear' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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

  const match = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  // Render loading state while data is being fetched
  if (blogsLoading || usersLoading) {
    return <div>Loading...</div>
  }

  const userDetails = match ? usersDetails.find(user => user.id === match.params.id) : null
  const blogDetails = matchBlog ? filteredBlogs.find(blog => blog._id === matchBlog.params.id) : null

  return (
    <div style={{ margin:'20px' }}>
      <h2><ins>Blogs</ins></h2>
      <Notification message={notification.message} isError={isError}/>
      {user ? (
        <>
          <div>
            <nav className='nav'>
              <Link className='nav-link active' to='/'>blogs</Link>
              <Link className='nav-link active' to='/users'>users</Link>
              <p className="nav-link disabled" >{user.name} logged in</p>
              <button type="button" className="btn btn-primary nav-link active" style={{ display:'flex', marginBottom: '15px' }} onClick={handleLogout}>logout</button>
            </nav>
          </div>
          <Routes>
            <Route path='/' element={
              <>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                  <h2>Create new</h2>
                  <BlogForm user={user}/>
                </Togglable>
                {filteredBlogs.sort((a, b) => b.likes - a.likes).map(blog => (
                  <div key={blog._id} className='card' style={{ marginBottom:'5px', marginTop:'5px' }}>
                    <div className='card-body'>
                      <Link to={`/blogs/${blog._id}`}>
                        {blog.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            } />
            <Route path='/users' element={<UserView usersDetails={usersDetails}/>}/>
            <Route path='/users/:id' element={<UserBlogs userDetails={userDetails}/>}/>
            <Route path='/blogs/:id' element={<BlogNew blog={blogDetails} user={user}/>}/>
          </Routes>
        </>
      ) : (
        LoginForm()
      )}
    </div>
  )
}

export default App