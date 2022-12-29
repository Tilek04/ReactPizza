import React, { useEffect, useState } from "react";
import "./scss/app.scss";

//Local dependence
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";


function App() {
  const [pizzas, setPizzas] = useState([])

useEffect(() => {
  fetch('https://63aaac617d7edb3ae62dc36c.mockapi.io/pizzas').then((res) => {
    return res.json()
  })
  .then((json) => {
    setPizzas(json)
  }) 
},[])



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
