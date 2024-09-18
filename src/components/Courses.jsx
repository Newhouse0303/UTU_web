import React from "react";

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <React.Fragment key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </React.Fragment>
      ))}
    </div>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        <b>
          Number of exercises{" "}
          {parts.reduce((sum, part) => sum + part.exercises, 0)}
        </b>
      </p>
    </div>
  );
};

export default Courses;
