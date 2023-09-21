import React from "react";

export function MoneyForm() {
  const [personName, setPersonName] = React.useState("");

  return (
    <>
      <form>
        <label htmlFor="person-name">
          Enter your name and I'll give you $5.
        </label>
        <input
          type="text"
          id="person-name"
          value={personName}
          onChange={(event) => {
            setPersonName(event.target.value);
          }}
        />
      </form>

      <p>Person Name: {personName}</p>

      <button onClick={() => setPersonName("lol, jk.")}>Submit</button>
    </>
  );
}

export default MoneyForm;
