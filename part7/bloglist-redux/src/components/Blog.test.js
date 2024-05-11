import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Hello is me here with ur boy',
  author: 'Waichee',
  url: 'www.example.com',
  likes: 2,
  user: { name: 'scott', username: 'scott', id: '12121' }
}

test('renders blog', () => {
  render(<Blog blog={blog}/>)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
})

test('renders blog with url and likes', async () => {
  const user = userEvent.setup()

  render(<Blog blog={blog}/>)
  const viewButton = screen.getByText('view')

  await user.click(viewButton)
  const element = screen.getByText(`${blog.title} ${blog.author}`)
  const urlElement = screen.getByText(`${blog.url}`)
  const likesElement = screen.getByText(`likes ${blog.likes}`)
  expect(element).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('click likes on the blog', async () => {
  const user = userEvent.setup()
  const updateLikes = jest.fn()

  render(<Blog blog={blog} updateLikes={updateLikes}/>)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.dblClick(likeButton)

  expect(updateLikes.mock.calls).toHaveLength(2)
})