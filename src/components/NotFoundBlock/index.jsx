import React from "react";

import styles from "./NotFoundBlock.module.scss";

const index = () => {
    console.log(styles);
  return (
    <h1 className={styles.root}>
      <span>404</span> <br/> Page not found :(
    </h1>
  );
};
export default index;
