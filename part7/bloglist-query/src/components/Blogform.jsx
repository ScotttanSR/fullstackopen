import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog } from '../request'


const BlogForm = ({ user }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogWithUser = { ...newBlog, user: { id: user.id, name: user.name, username: user.username } }
      queryClient.setQueryData(['blogs'], blogs.concat(newBlogWithUser))
    },
    onError: (err) => {
      console.error('err:', err)
    }
  })

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }
    newBlogMutation.mutate(content)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
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