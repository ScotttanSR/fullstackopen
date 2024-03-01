import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [viewDetails, setViewDetails] = useState(false)

  const handleOnClick = (event) => {
    event.preventDefault()
    setViewDetails(!viewDetails)
  }

  const handleOnClickLikes = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: (blog.likes+1) }
    updateLikes(blog._id, updatedBlog)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    console.log('blog id', blog._id)
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteBlog(blog._id)
    }
  }



  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleOnClick}>{viewDetails ? 'hide' : 'view'}</button>
      {viewDetails &&
      (<div>
        <span>{blog.url}</span>
        <br/>
        <span className='clickLikes'>likes {blog.likes}
          <button onClick={handleOnClickLikes}
          >
            like
          </button>
        </span>
        <br/>
        <span>{blog.user.name}</span>
        <br/>
        <button onClick={handleDelete}>remove</button>
      </div>
      )
      }
    </div>
  )}

export default Blog