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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="message">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    try {
      await personsService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
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
      setPersons(persons.concat(response.data)); // using response.data will add
      setMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
      <Notification message={message} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
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
