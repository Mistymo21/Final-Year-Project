import React from "react";
import styles from "./LandingPage.module.css";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
          <Link href="Staff">
        <button>
        <FaChalkboardTeacher size={70} className={styles.icon}/>
        Staff
        </button>
          </Link>
          <Link href="Student">
        <button>
           <FaChalkboardTeacher size={70} className={styles.icon}/>
           Student
        </button>
          </Link>
      </div>
    </div>
  );
};

export default page;
