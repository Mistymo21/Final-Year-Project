import React from "react";
import styles from "./studentTable.module.css";
import Link from "next/link";
import { fetchStudentsData } from "@/lib/data";
const StudentTable = async () => {
  const students = await fetchStudentsData()
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <p>Number of students</p>
          <span>1</span>
        </div>
        <div className={styles.box}>
          <p>Number of students cleared</p>
          <span>0</span>
        </div>
        <div className={styles.box}>
          <p>Number of students submitted</p>
          <span>1000+</span>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th> Name</th>
              <th>Martic No.</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {students.map((student) => (
                <tr key={student.matric_no}>
              <td>{`${student.firstName} ${student.lastName}`}</td>
              <td>{student.matric_no}</td>
              <td>{student.department}</td>
              <td>{student.faculty}</td>
              <td>20.24.24</td>
              <td>
                <Link href={`/Staff/SingleStudent/${student.id}`} className={styles.btn}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
