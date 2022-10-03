import { Container, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Container>
      <HStack justify={"space-around"}>
        <Link to="/">Home</Link>
        <Link to="/Github">Github Insights</Link>
        <Link to="/Projects">Projects</Link>
        <Link to="/Resume">Resume</Link>
      </HStack>
    </Container>
  );
}

export default Navbar;
