
const Notification = ({message}) => {
    if (message === null) return null
    const notificationStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        border: 'solid 5px',
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
        borderRadius: 5
    }
    return (<div style={notificationStyle}>
        {message}
    </div>)
}

export default Notification