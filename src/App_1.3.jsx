
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts.part1.name} exercises={parts.part1.exercises}/>
      <Part name={parts.part2.name} exercises={parts.part2.exercises}/>
      <Part name={parts.part3.name} exercises={parts.part3.exercises}/>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <div>
      <p>{name} {exercises}</p>      
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises: {parts.part1.exercises + parts.part2.exercises + parts.part3.exercises}</p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts= {parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App