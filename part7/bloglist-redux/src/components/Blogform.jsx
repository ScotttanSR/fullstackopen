import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'



const BlogForm = ({ user }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()
  console.log('user', user.id);


  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: blogTitle,
  //     author: blogAuthor,
  //     url: blogUrl,
  //     likes: 0
  //   })
  //   setBlogTitle('')
  //   setBlogAuthor('')
  //   setBlogUrl('')
  // }

  const addBlog2 = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }, user))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog2}>
      <span>title:
        <input
          value={blogTitle}
          onChange={handleTitleChange}
          placeholder='title'
        />
      </span>
      <br/>
      <span>author:
        <input
          value={blogAuthor}
          onChange={handleAuthorChange}
          placeholder='author'
        />
      </span>
      <br/>
      <span>url:
        <input
          value={blogUrl}
          onChange={handleUrlChange}
          placeholder='url'
        />
      </span>
      <br/>
      <button type="submit">create</button>
    </form>
  )}


export default BlogForm