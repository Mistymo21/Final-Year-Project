import StudentTable from "@/components/ui/studentTable/studentTable";
import React from "react";
// import styles from "./page.module.css";

// import Link from "next/link";

const LA = async () => {
  
  return (
    <StudentTable searchParams={URLSearchParams}/>
  );
};

export default LA;
