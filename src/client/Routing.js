import React from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import { Container } from "@chakra-ui/react";

import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import Navbar from "./components/Navbar/Navbar";
import Github from "./components/Github/Github";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Projects" element={<Projects />} />
          <Route path="Github" element={<Github />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;

const Layout = () => {
  return (
    <Container maxW={"100%"}>
      <Navbar />
      <Outlet />
    </Container>
  );
};
