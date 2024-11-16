import React from 'react';
import { AnimatePresence } from "framer-motion";
import {Route, Routes} from "react-router-dom";
import {URLs} from "./__data__/URLs.js";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Reg from "./pages/Reg.jsx";
import Setup from "./pages/Setup.jsx";
import Account from "./pages/Account.jsx";
import Compat from "./pages/Compat.jsx";

const Pages = () => {
  return (
      <AnimatePresence mode={"wait"}>
          <Routes>
              <Route path={URLs.home} element={<Home/>}/>
              <Route path={URLs.auth} element={<Auth/>}/>
              <Route path={URLs.reg} element={<Reg/>}/>
              <Route path={URLs.setup} element={<Setup/>}/>
              <Route path={URLs.account} element={<Account/>}/>
              <Route path={URLs.compat} element={<Compat/>}/>
          </Routes>
      </AnimatePresence>
  );
};

export default Pages;
