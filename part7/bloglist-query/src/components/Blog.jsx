import { useState } from 'react'
import { updateLike, deleteBlog } from '../request'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [viewDetails, setViewDetails] = useState(false)
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: ({ id, newObject }) => updateLike(id, newObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map((blog) => {
        if (blog._id === updatedBlog._id) {
          return { ...updatedBlog, user: { name: user.name, username: user.username, id: updatedBlog.user } }
        }
        return blog
      }))
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      const id = blog._id
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog._id !== id))
    }
  })

  const handleOnClick = (event) => {
    event.preventDefault()
    setViewDetails(!viewDetails)
  }

  const handleOnClickLikes = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: (blog.likes+1) }
    console.log('updatedablog', updatedBlog)
    updateMutation.mutate({ id: blog._id , newObject: updatedBlog })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteMutation.mutate(blog._id)
    }
  }



  return (
    <div style={blogStyle} className='blog card'>
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