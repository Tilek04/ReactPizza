import React from "react";
import { useState } from "react";

function Categories({value, onClickCategory}) {
  const [ setActiveIndex] = useState(0);

  const onClickIndex = (index) => {
    setActiveIndex(index);
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : " "}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
