const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
