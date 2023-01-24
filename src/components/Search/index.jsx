import React from 'react'

import styles from './Search.module.scss'

export const Search = ({searchValue, setSearchValue}) => {
    console.log(searchValue);
  return (
    <div className={styles.root}>
        <img className={styles.search} src="https://cdn-icons-png.flaticon.com/512/622/622669.png" alt="Search" />
  <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className={styles.input} type="text" placeholder='Search...'/>
 {searchValue &&(<img onClick={() => setSearchValue('')} className={styles.closeIcon} src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png" alt="Close" />   )}
 </div>
  
  )
}