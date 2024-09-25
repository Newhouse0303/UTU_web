const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label>
          name:
          <input value={newName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
