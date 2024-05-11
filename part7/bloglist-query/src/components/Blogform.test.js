import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './Blogform'
import userEvent from '@testing-library/user-event'


test('blog form after submit give the correct props', async () => {
  const user = userEvent.setup()
  const createBlogMock = jest.fn()

  render(<BlogForm createBlog={createBlogMock}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'hello')
  await user.type(authorInput, 'waichee')
  await user.type(urlInput, 'www.google.com')
  await user.click(createButton)


  expect(createBlogMock).toHaveBeenCalledWith({
    title: 'hello',
    author: 'waichee',
    url: 'www.google.com',
    likes: 0
  })

})