
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1.name} exercises={props.part1.exercises}/>
      <Part name={props.part2.name} exercises={props.part2.exercises}/>
      <Part name={props.part3.name} exercises={props.part3.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>      
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.int1 + props.int2 + props.int3}</p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1= {part1} part2= {part2} part3= {part3}/>
      <Total int1={part1.exercises} int2={part2.exercises} int3={part3.exercises}/>
    </div>
  )
}

export default App