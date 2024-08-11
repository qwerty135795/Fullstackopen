import {useEffect, useState} from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo.jsx";

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState(null)
    const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/'
    useEffect(() => {
        axios
            .get(`${apiUrl}/api/all`)
            .then(res => {
                setCountries(res.data)
            })
    }, [])
    const handleChangeOf = (event) => {
        setFilter(event.target.value)
    }
    return (
        <div>
            <label htmlFor="countryInput">find countries </label>
            <input id="countryInput" value={filter} onChange={handleChangeOf} />
            {countries !== null && filter !== '' ?
                <CountryInfo countries={countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))} />
                : <></>
            }
        </div>
    )
}


export default App