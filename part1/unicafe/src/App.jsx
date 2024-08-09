import {useState} from "react";

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (<div>
        <h1>give feedback</h1>
        <Button text={'good'} handleClick={addGood}/>
        <Button text={'neutral'} handleClick={addNeutral}/>
        <Button text={'bad'} handleClick={addBad}/>
        <h2>Statistic</h2>
        <Statistic good={good} neutral={neutral} bad={bad}/>

    </div>)
}

const Button = ({handleClick, text}) => {
    return (<button onClick={handleClick}>{text}</button>)
}

const Statistic = ({good, neutral, bad}) => {
    const getAverage = () => {
        return  (good   + bad * -1) / (good + bad + neutral)

    }
    const getPositive = () => {
        return good / (good + bad + neutral) * 100
    }
    if (good + neutral + bad > 0 ){
        return (<table>
            <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={good + neutral + bad } />
            <StatisticLine text={'average'} value={getAverage()} />
            <StatisticLine text={'positive'} value={getPositive() +' %'} />
            </tbody>
        </table>)
    }
    return (<p>No feedback given</p>)
}

const StatisticLine = ({text,value}) => {
    return (<tr><td>{text}</td><td>{value}</td></tr>)
}

export default App
