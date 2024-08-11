const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id}  part={part} />)}
    </>
const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>


const Course = ({course}) => {

    const getSum = () =>
        course.parts.reduce((init, next) => init + next.exercises,0)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={getSum()} />
        </>)
}
export default Course