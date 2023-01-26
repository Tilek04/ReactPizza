import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";


import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skiliton from "../components/Skiliton";
import Pagination from "../Pagination";
import { useContext } from "react";
import { searchColumn } from "../App";

export const Home = () => {
  const {searchValue} = useContext(searchColumn)
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty.replace("-", " ");
    const order = sortType.sortProperty.includes("-") ? "ask" : "desk";
    const category = categoryId > 0 ? `category=${categoryId}` : " ";

    // Не сработал из за MockApi
    // const search = searchValue ? `&search=${searchValue}` : " ";

    fetch(
      `https://63aaac617d7edb3ae62dc36c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())

      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);
  window.scrollTo(0, 0);
  console.log(sortType);

  const items = pizzas
    // Статичный поиск
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skiliton key={index} />
  ));

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
        <div className="content__items">{isLoading ? skeletons : items}</div>
       <Pagination onChangePagination={(namber) => setcurrentPage(namber)}/>
      </div>
    </>
  );
};
