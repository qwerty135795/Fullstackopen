import Weather from "./Weather.jsx";

const DetailedInfo = ({country}) => {

    return (<div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <b>languages:</b>
        <ul>
            {Object.entries(country.languages).map(([sh, full]) => <li key={sh}>{full}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
        <Weather country={country} />
    </div>)
}

export default DetailedInfo