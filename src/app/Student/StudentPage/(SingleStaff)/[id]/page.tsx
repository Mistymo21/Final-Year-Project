import React from "react";
import styles from "./page.module.css";

const StaffSinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.staffInfo}>
        <p>
          Staff Name: <b>Nana Aisha</b>
        </p>
        <p>
          Unit: <b>Level Adviser</b>
        </p>
      </div>
      <div className={styles.seperator}></div>
      <div className={styles.uploadDetails}>
        <div>
          <label htmlFor="input"></label>
          <input type="file" id="input" />
        </div>
      </div>
    </div>
  );
};

export default StaffSinglePage;
