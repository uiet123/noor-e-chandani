import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body/Body";
import Hero from "./components/Hero/Hero";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Hero />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
