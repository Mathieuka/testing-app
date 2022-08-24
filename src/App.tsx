import "./App.css";
import { Div } from "@sharegate/orbit-ui";
import { Route, Routes } from "react-router-dom";
import Cockpit from "./pages/Cockpit";
import Login from "./pages/Login";
import React from "react";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cockpit" element={<Cockpit />} />
        <Route path="*" element={<Div>Wrong path</Div>} />
      </Routes>
  );
};

export default App;
