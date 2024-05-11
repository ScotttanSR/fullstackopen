import { useState } from 'react'
import { updateLike, deleteBlog, addComment } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogNew = ({ blog, user }) => {

  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState('')

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

  const addCommentMutation = useMutation({
    mutationFn: ({ id, newObject }) => addComment(id, newObject),
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

  if (!blog) {
    return null
  }

  const handleOnClickLikes = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: (blog.likes+1) }
    updateMutation.mutate({ id: blog._id , newObject: updatedBlog })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteMutation.mutate(blog._id)
    }
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    const comment = {
      comment: newComment,
    }
    addCommentMutation.mutate({ id: blog._id, newObject: comment })
    setNewComment('')
  }

  const BlogComments = () => (blog.comments.map((comment) => (
    <li key={comment._id}>
      {comment.content}
    </li>
  )))


  return (
    <div className='blog'>
      <div className='card' style={{ width: '18rem' }}>
        <div className='card-body'>
          <h4>{blog.title} {blog.author}</h4>
          <span>{blog.url}</span>
          <br/>
          <span className='clickLikes'>likes {blog.likes}
            <button onClick={handleOnClickLikes} className='btn btn-primary'
            >
              like
            </button>
          </span>
          <br/>
          <span>added by {blog.user.name}</span>
        </div>
      </div>
      <br/>
      <h5>comments</h5>
      <form onSubmit={handleCommentSubmit}>
        <input
          type='text'
          placeholder='add a comment'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className='btn btn-primary'>add comment</button>
      </form>
      <ul>
        <BlogComments/>
      </ul>
      <br/>
      <button onClick={handleDelete} className='btn btn-danger'>remove</button>
    </div>
  )}

export default BlogNew