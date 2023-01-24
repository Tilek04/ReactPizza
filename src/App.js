import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';

import "./scss/app.scss";

//Local dependence
import Header from "./components/Header";
import { Home } from "./Pages/Home";
import { Card } from "./Pages/Card";
import NotFound from "./Pages/NotFound";



function App() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
        <div className="container">
       <Routes>
        <Route path="/" element={<Home searchValue={searchValue}/>}/>
        <Route path="card" element={<Card/>}/>
        <Route path="*" element={<NotFound/>}/>
       </Routes>
       </div>
      </div>
    </div>
  );
}

export default App;
