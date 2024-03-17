import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './request'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'newAnecdote':
      return { message: `New anecdote "${action.content}" created` };
    case 'voteAnecdote':
      return { message: `You voted for "${action.content}"` };
    case 'error': 
      return { message: action.content};
    case 'clear':
      return {message: null};
    default:
      return state
  }
};

const App = () => {
  const [notification, notifactionDispatch] = useReducer(notificationReducer, {message: null})
  const queryClient = useQueryClient()

const voteMutation = useMutation({
  mutationFn: updateVote, 
  onSuccess: (updatedAnecdote) =>{
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ? a:updatedAnecdote))
  }
})

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    notifactionDispatch({ type: 'voteAnecdote', content: anecdote.content })
    setTimeout(() => {
      notifactionDispatch({type: 'clear'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notifcation={notification.message}/>
      <AnecdoteForm dispatch={notifactionDispatch} type='newAnecdote'/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
