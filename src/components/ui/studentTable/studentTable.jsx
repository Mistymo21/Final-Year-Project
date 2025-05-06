import React from "react";
import styles from "./studentTable.module.css";
import Link from "next/link";
import { getClearanceSubmissions } from "@/lib/data";

const StudentTable = async () => {
  const students = await getClearanceSubmissions();

  const totalStudents = students.length;
  const clearedStudents = students.filter(s => s.status === "accepted").length;
  const submittedStudents = students.filter(s => s.status !== "pending").length;

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <p>Number of students</p>
          <span className={styles.total}>{totalStudents}</span>
        </div>
        <div className={styles.box}>
          <p>Number of students cleared</p>
          <span className={styles.total}>{clearedStudents}</span>
        </div>
        <div className={styles.box}>
          <p>Number of students submitted</p>
          <span className={styles.total}>{submittedStudents}</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric No.</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.matricNo}>
                <td>{student.studentName}</td>
                <td>{student.matricNo}</td>
                <td>{student.department}</td>
                <td>{student.faculty}</td>
                <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    href={`/Staff/SingleStudent/${student.id}`}
                    className={styles.btn}
                  >
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
