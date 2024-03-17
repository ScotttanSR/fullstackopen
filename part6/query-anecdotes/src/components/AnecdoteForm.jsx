import { createAnecdote } from "../request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({dispatch, type}) => {

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('new', newAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log('anedotes', anecdotes);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      dispatch({type: 'error', content: err.response.data.error})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({ type: type, content: content})
    setTimeout(() => {
      dispatch({type: 'clear'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
