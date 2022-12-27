import React from "react";
import { useState } from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

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
        {categories.map((value, i) => (
          <li key={i}
            onClick={() => onClickIndex(i)}
            className={activeIndex === i ? "active" : " "}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
