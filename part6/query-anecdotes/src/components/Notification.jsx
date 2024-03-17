// eslint-disable-next-line react/prop-types
const Notification = ({notifcation}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notifcation) return null

  return (
    <div style={style}>
      {notifcation}
    </div>
  )
}

export default Notification
