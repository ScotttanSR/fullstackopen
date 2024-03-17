import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

 export const updateVote = (anecdote) => {
    const updatedAnecodesVote = anecdote.votes + 1
    const updatedAnecodes = {
      ...anecdote, 
      votes: updatedAnecodesVote
    }
    const request = axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecodes)
    return request.then(response => response.data)
  }