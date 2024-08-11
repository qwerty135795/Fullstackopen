

const Error = ({message}) => {
    if (message === null) return null
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey',
        border: 'solid 5px',
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
        marginBottom: 10
    }
    return (<div style={errorStyle}>
        {message}
    </div>)
}

export default Error