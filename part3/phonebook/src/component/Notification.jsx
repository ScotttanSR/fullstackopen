const Notification = ({ message, isError }) => {
    const bannerStyle = {
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={bannerStyle}>
        {message}
      </div>
    )
  }

  export default Notification