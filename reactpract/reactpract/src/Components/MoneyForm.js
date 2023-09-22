import React from "react";

export function MoneyForm() {
  const [personName, setPersonName] = React.useState("");

  return (
    <>
      <form
        className="moneyForm"
        onSubmit={(event) => {
          event.preventDefault();
          setPersonName("lol jk");
        }}
      >
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

        <p>Person Name: {personName}</p>

        <button>Submit</button>
      </form>
    </>
  );
}

export default MoneyForm;
