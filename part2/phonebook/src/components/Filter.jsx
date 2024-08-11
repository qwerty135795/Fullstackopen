
const Filter = ({filter,handleNewFilter}) => {
    return (<div>
        <input value={filter} onChange={handleNewFilter}/>
    </div>)
}

export default Filter