import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filterState = state.filter
    if ( state.filter === 'ALL') {
        return ([...state.anecdote].sort((a, b) => b.votes - a.votes))
    } else {
        const filteredAbecdotes = state.anecdote.filter((anec) => anec.content.toLowerCase().includes(filterState.toLowerCase()));
        return (filteredAbecdotes.sort((a, b) => b.votes - a.votes))
    }
    })
    const dispatch = useDispatch()


    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        dispatch(voteAnecdotes(anecdote))
                        dispatch(setNotification(`You voted for "${anecdote.content}"`, 5));
                        }}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList