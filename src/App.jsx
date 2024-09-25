import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <>
          <p key={person.id}>
            {person.name} {person.number}
          </p>
          <button
            onClick={() => console.log(`buttons clicked for {person.name}`)}
          >
            delete
          </button>
        </>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // useEffect(() => {
  //   console.log("effect");
  //   axios.get("http://localhost:3001/persons").then((response) => {
  //     console.log("promise fulfilled");
  //     setPersons(response.data);
  //   });
  // }, []);
  // console.log("render", persons.length, "persons");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    if (newName === "") return;

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((response) => {
      setPersons(persons.concat(personObject));
      setNewName("");
    });

    // axios
    //   .post("http://localhost:3001/persons", personObject)
    //   .then((response) => {
    //     setPersons(persons.concat(personObject));
    //   });

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
