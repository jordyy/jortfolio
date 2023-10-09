import React from "react";

export default function UselessButton() {
  const id = React.useId();
  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(() => {
    if (isOn) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsOn(true);
    }, 1000);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOn]);

  return (
    <>
      <p>check this box if you still want to be my friend. (rhetorical).</p>
      <input
        id={id}
        type="checkbox"
        checked={isOn}
        onchange={(event) => {
          setIsOn(event.target.checked);
        }}
      />
    </>
  );
}
