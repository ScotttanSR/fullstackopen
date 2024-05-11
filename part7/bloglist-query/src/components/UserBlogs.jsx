const UserBlogs = ({ userDetails }) => {
  const user = userDetails
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {<ul>
          {user.blogs.map((blog) => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul>}
      </ul>
    </div>
  )
}

export default UserBlogs