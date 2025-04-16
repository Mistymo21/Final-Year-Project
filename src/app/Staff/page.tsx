import React from "react";
import styles from "./Staff.module.css";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link href="Staff/Login" className={styles.button}>
        
          <button>Login</button>
        </Link>
        <Link href="Staff/Signup" className={styles.button}>
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default page;
