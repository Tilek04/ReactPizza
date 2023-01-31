import React from "react";
import { useContext } from "react";
import { searchColumn } from "../../App";
import { useRef } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { useCallback } from "react";
import { useState } from "react";

export const Search = () => {
  const [value, setValue] = useState()
  const { searchValue, setSearchValue } = useContext(searchColumn);

  

  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue('')
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str) => {
     setSearchValue(str)
      
    }, 1000),
    []
  );

  const onChangeInput = event => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <img
        className={styles.search}
        src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
        alt="Search"
      />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Search..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.closeIcon}
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
          alt="Close"
        />
      )}
    </div>
  );
};
