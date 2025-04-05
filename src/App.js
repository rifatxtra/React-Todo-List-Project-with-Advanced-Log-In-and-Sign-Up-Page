import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import SignUP from "./pages/SignUP";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>

      <Routes>
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="/log-in" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
