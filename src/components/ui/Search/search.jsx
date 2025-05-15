"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./search.module.css";

const search = ({students}) => {
  return (
    <div className={styles.search}>
      <CiSearch />
      <input type="search" placeholder="Search for student...." />
    </div>
  );
};

export default search;
