import React from 'react';
import { AnimatePresence } from "framer-motion";
import {Route, Routes} from "react-router-dom";
import {URLs} from "./__data__/URLs.js";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

const Pages = () => {
  return (
      <AnimatePresence mode={"wait"}>
          <Routes>
              <Route path={URLs.home} element={<Home/>}/>
              <Route path={URLs.login} element={<Login/>}/>
          </Routes>
      </AnimatePresence>
  );
};

export default Pages;
