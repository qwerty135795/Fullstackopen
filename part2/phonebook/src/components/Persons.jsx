const Persons = ({users, handleDelete}) => {
    return (<>
        {users.map(p =>
            <div key={p.id}>
                    <span>{p.name} {p.number} </span>
                    <button onClick={() => handleDelete(p.id)}>delete</button>
            </div>)}
    </>)
}

export default Persons