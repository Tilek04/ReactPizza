import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skiliton from "../components/Skiliton";
import Pagination from "../Pagination";
import { useContext } from "react";
import { searchColumn } from "../App";
import { setCategoryId, setCurrentPage } from "../Redux/slices/filterSlice";
import axios from "axios";

export const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort, pageCount} = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);


  const { searchValue } = useContext(searchColumn);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace("-", " ");
    const order = sortType.includes("-") ? "ask" : "desk";
    const category = categoryId > 0 ? `category=${categoryId}` : " ";

    // Не сработал из за MockApi
    // const search = searchValue ? `&search=${searchValue}` : " ";

    // fetch(
    //   `https://63aaac617d7edb3ae62dc36c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    // )
    //   .then((res) => res.json())

    //   .then((arr) => {
    //     setPizzas(arr);
    //     setIsLoading(false);
    //   });
    axios.get(`https://63aaac617d7edb3ae62dc36c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
    .then(res => {
      setPizzas(res.data)
      setIsLoading(false)
    })
  }, [categoryId, sortType, searchValue, currentPage]);
  window.scrollTo(0, 0);

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

  const onChangeCategory = (id) => {

    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />

          <Sort  />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : items}</div>
        <Pagination value={currentPage} onChangePagination={onChangePage} />
      </div>
    </>
  );
};
