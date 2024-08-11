import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons.jsx";
import personsService from './services/persons'
import Notification from "./components/Notification.jsx";
import Error from "./components/Error.jsx";


const App = () => {
    useEffect(() => {
        personsService.getAll()
            .then(response => setPersons(response))
    }, [])

    const [persons, setPersons] = useState(null)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notifyMessage, setNotifyMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    if (persons === null) {
        return null
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleNewFilter = (event) => setNewFilter(event.target.value)

    const filteredUsers = persons.filter(p => p.name.toLowerCase().startsWith(newFilter.toLowerCase()))
    const addPerson = (event) => {
        event.preventDefault()
        const existedPerson = persons.find(p => p.name === newName)
        if (existedPerson) {
            if (confirm(`${newName} is  already added to phonebook, replace the old number
            with a new one`)) {
                personsService.update(existedPerson.id, {...existedPerson, number: newNumber})
                    .then(res => {
                        setPersons(persons.map(person => person.id === res.id ? res: person))
                        setNewName('')
                        setNewNumber('')
                        setNotifyMessage(`Changed ${res.name} number`)
                        setTimeout(() => setNotifyMessage(null), 5000)
                    }).catch(error => {
                        setErrorMessage(`Information of ${existedPerson.name} has already been removed from server`)
                        setTimeout(() => setErrorMessage(null), 5000)
                })
                return
            }
            else {
                return
            }
        }
        const personData = {name: newName, number: newNumber}
        personsService.create(personData)
            .then(response => {
                setPersons([...persons, response])
                setNewName('')
                setNewNumber('')
                setNotifyMessage(`Added ${response.name}`)
                setTimeout(() => setNotifyMessage(null), 5000)
            })

    }

    const handleDeleteOf = id => {
        if (confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
            personsService.deletePerson(id)
                .then(res => setPersons(persons.filter(p => p.id !== res.id)))
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notifyMessage} />
            <Error message={errorMessage} />
            <Filter filter={newFilter} handleNewFilter={handleNewFilter}  />
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
            handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons handleDelete={handleDeleteOf} users={filteredUsers} />
        </div>
    )
}

export default App