import { Link } from 'react-router-dom'

const UserView = ({ usersDetails }) => {

  const usersTable = usersDetails.map((user) => {
    const blogsCreated = user.blogs.length
    return (
      <tbody key={user.id}>
        <tr>
          <Link to={`/users/${user.id}`}>
            <td>{user.username}</td>
          </Link>
          <td>{blogsCreated}</td>
        </tr>
      </tbody>
    )
  })


  return (
    <div>
      <h2>Users</h2>
      <table className='table'>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {usersTable}
      </table>
    </div>
  )
}

export default UserView