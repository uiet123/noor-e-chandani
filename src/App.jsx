import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body/Body";
import Hero from "./components/Hero/Hero";
import Cart from "./components/Cart/Cart";
import CollectionDetails from "./components/CollectionDetails/CollectionDetails";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import Collections from "./components/Collections/Collections";
import About from "./components/About/About";
import FAQ from "./components/FAQ/FAQ";
import Shipping from "./components/Shipping/Shipping";
import Returns from "./components/Returns/Returns";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import Contact from "./components/Contact/Contact";
import Signup from "./components/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Hero />} />
          <Route path="collections/:slug" element={<CollectionDetails />} />
          <Route path="/collections" element={<Collections/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/returns" element={<Returns/>}/>
          <Route path="/privacy" element={<Privacy/>}/>
          <Route path="/terms" element={<Terms/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
