import DetailedInfo from "./DetailedInfo.jsx";
import {useState} from "react";

const CountryInfo = ({countries}) => {
    const onClickOf = (name) => {
        if (detailedInfo.includes(name)){
            setDetailedInfo(detailedInfo.filter(c => c !== name))
        } else {
            setDetailedInfo([...detailedInfo, name])
        }
    }
    const [detailedInfo, setDetailedInfo] = useState([])
    if (countries.length === 0) return null
    if (countries.length > 10) {
        return (<p>Too many matches. specify another filter</p>)
    } else if(countries.length <= 10 && countries.length > 1) {
        return (
            countries.map(c => <div key={c.name.official}> <span>{c.name.common} </span>
                <button onClick={() => onClickOf(c.name.official)}>
                    {detailedInfo.includes(c.name.official) ? 'close' : 'show'}
                </button>
                {detailedInfo.includes(c.name.official) ? <DetailedInfo country={c} /> : <></>}
            </div>)
        )
    }
    return (
            <DetailedInfo country={countries[0]} />
        )

}

export default CountryInfo