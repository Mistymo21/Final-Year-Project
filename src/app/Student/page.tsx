import React from "react";
import styles from "./student.module.css";
import Link from "next/link";

function page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Link href="Student/Login">
            <button>Login</button>
          </Link>
          <Link href="Student/Signup">
            <button>Signup</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default page;
