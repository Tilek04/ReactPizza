import React from "react";
import { useState, useEffect } from "react";
import qs from "qs"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skiliton from "../components/Skiliton";
import Pagination from "../Pagination";
import { useContext } from "react";
import { searchColumn } from "../App";
import sortlist from "../components/Sort"
import { setCategoryId, setCurrentPage, setFilters } from "../Redux/slices/filterSlice";

import axios from "axios";
import { useRef } from "react";

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const isMounted = useRef()


  const { searchValue } = useContext(searchColumn);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

 

// useEffect(() => {
//   if(window.location.search){
//     const params = qs.parse(window.location.search.substring(1));

//     const sort = sortlist.find((obj) => obj.sortProperty === params.sortProperty);


//     dispatch(
//       setFilters({
//         ...params,
//         sort
//       })
//     )
   

    
//     }
// },[])


useEffect(() => {
 window.scrollTo(0,0)
},[categoryId, sortType, currentPage])

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
  }, [categoryId, sortType,  currentPage]);
  window.scrollTo(0, 0);

  useEffect(() => {
if(isMounted.current){
  const queryString = qs.stringify({
    sortType,
    categoryId,
    currentPage
   })
   navigate(`?${queryString}`)
}
isMounted.current = true
  },[sortType, categoryId, currentPage])

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
