import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer';

const Blog = ({ user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // const [viewDetails, setViewDetails] = useState(false)
  const [visibleBlogId, setVisibleBlogId] = useState(null);
  const dispatch = useDispatch()
  

  const handleOnClick = (blogId) => {
    setVisibleBlogId(visibleBlogId === blogId ? null : blogId);
  }
  
  const blogs = useSelector(state => {
    console.log('code run here', state.blog)
    const filteredBlogs = state.blog.filter(blog => blog.user.id===user.id)
    return (
      filteredBlogs.sort((a,b) => b.likes - a.likes)
    )
  })



  const handleOnClickLikes = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: (blog.likes+1) }
    updateLikes(blog._id, updatedBlog)
  }

  // const handleDelete = (event) => {
  //   event.preventDefault()
  //   console.log('blog id', blog._id)
  //   if (window.confirm(`Delete ${blog.title}?`)) {
  //     deleteBlog(blog._id)
  //   }
  // }

  const handleDelete2 = async (blogId) => {
    dispatch(deleteBlog(blogId))
  }



  return (
    // <div style={blogStyle} className='blog'>
    //   {blog.title} {blog.author}
    //   <button onClick={handleOnClick}>{viewDetails ? 'hide' : 'view'}</button>
    //   {viewDetails &&
    //   (<div>
    //     <span>{blog.url}</span>
    //     <br/>
    //     <span className='clickLikes'>likes {blog.likes}
    //       <button onClick={handleOnClickLikes}
    //       >
    //         like
    //       </button>
    //     </span>
    //     <br/>
    //     <span>{blog.user.name}</span>
    //     <br/>
    //     <button onClick={handleDelete}>remove</button>
    //   </div>
    //   )
    //   }
    // </div>
    <>
    {
      blogs.map(blog => (
        <div key={blog._id} style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        <button onClick={() => handleOnClick(blog._id)}>{visibleBlogId === blog._id ? 'hide' : 'view'}</button>
        {visibleBlogId === blog._id &&
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
          <button onClick={() => handleDelete2(blog._id)}>remove</button>
        </div>
        )
        }
      </div>
      ))
    }
    </>
  )}

export default Blog