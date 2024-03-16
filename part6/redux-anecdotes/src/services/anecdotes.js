import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = (anecdote) => {
  const updatedAnecodesVote = anecdote.votes + 1
  const updatedAnecodes = {
    ...anecdote, 
    votes: updatedAnecodesVote
  }
  const request = axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecodes)
  return request.then(response => response.data)
}

export default {
  getAll,
  createNew,
  updateVote,
}