import { useSelector } from "react-redux"

/* eslint-disable react/prop-types */
const Notification = ({ isError }) => {
  const notification = useSelector(state => state.notification)
  const bannerStyle = {
    color: isError ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    display: notification === 'null' ? 'none': '',
  }

  return (
    <div style={bannerStyle} className="notification">
      {notification}
    </div>
  )
}

export default Notification