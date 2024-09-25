import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";

const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button
            onClick={() => {
              console.log(`buttons clicked for ${person.id}`);
              handleDelete(person.id, person.name);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    console.log(`handleDelete for ${id}`);
    try {
      await personsService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
      console.log(`Deleted person with ID: ${id}`);
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/persons").then((response) => {
  //     setPersons(response.data);
  //   });
  // }, []);

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
      setPersons(persons.concat(response.data)); // using response.data will update the id
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
      <Numbers persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
