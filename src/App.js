import React, { createContext, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import "./scss/app.scss";

//Local dependence
import Header from "./components/Header";
import { Home } from "./Pages/Home";
import { Card } from "./Pages/Card";
import NotFound from "./Pages/NotFound";

 export const searchColumn = createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
     <searchColumn.Provider value={{searchValue, setSearchValue}}>
     <Header />
      <div className="content">
        <div className="container">
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="card" element={<Card/>}/>
        <Route path="*" element={<NotFound/>}/>
       </Routes>
       </div>
      </div>
     </searchColumn.Provider>
    </div>
  );
}

export default App;
