import React from "react";
import Link from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Github">Github Insights</Link>
        </li>
        <li>
          <Link to="/Projects">Projects</Link>
        </li>
        <li>
          <Link to="/Resume">Resume</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
