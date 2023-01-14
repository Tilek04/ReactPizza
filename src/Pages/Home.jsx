import React from "react";
import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skiliton from "../components/Skiliton";

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const order = sortType.sortProperty.includes("-") ? "ask" : "desk";
  const sortBy = sortType.sortProperty.replace("-", " ");
  const category = categoryId > 0 ? `category=${categoryId}` : " ";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63aaac617d7edb3ae62dc36c.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, [categoryId, sortType]);
  window.scrollTo(0, 0);
  console.log(sortType);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />

          <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skiliton key={index} />)
            : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </>
  );
};
