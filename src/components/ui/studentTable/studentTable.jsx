"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./studentTable.module.css";
import Link from "next/link";
import moment from "moment";

// Full mapping of verbose staff units to backend expected unit codes
const unitMap = {
  "Head of Department": "HOD",
  "Faculty Officer": "FO",
  "Dean of Faculty": "DOF",
  "Hostel Warden": "HW",
  "Director, Clinic": "DC",
  "Director of Sports": "DOS",
  "Director of Works": "DOW",
  "University Librarian": "UL",
  "Dean, Student Affairs": "DSA",
  "Stores Officer": "SO",
  "Accountant (Students)": "AS",
  "University Alumni Association": "UAA",
  "Director, CPPS (Top-Up only)": "DCPPS",
  "Director, IOE (Sandwich only)": "DIOE",
  "Studio Manager": "SM",
};

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [staffUnit, setStaffUnit] = useState("");

  useEffect(() => {
    const staffData = localStorage.getItem("staff");
    if (staffData) {
      const staff = JSON.parse(staffData);
      const normalizedUnit = unitMap[staff.unit] || staff.unit;
      setStaffUnit(normalizedUnit);
    }
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!staffUnit) return;

      try {
        // Use axios for the GET request
        const { data } = await axios.get(
          `/api/clearance/student/getStudentSubmission`,
          { params: { unit: staffUnit } }
        );

        setStudents(data.submission || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setStudents([]);
      }
    };

    fetchSubmissions();
  }, [staffUnit]);

  const totalStudents = students.length;
  const clearedStudents = students.filter((s) => s.status === "approved").length;
  const rejectedStudents = students.filter((s) => s.status === "rejected").length;

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
          <p>Number of students rejected</p>
          <span className={styles.total}>{rejectedStudents}</span>
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
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentName}</td>
                  <td>{student.matricNo}</td>
                  <td>{student.department}</td>
                  <td>{student.faculty}</td>
                  <td>{moment(student.createdAt).format("DD/MM/YYYY")}</td>
                  <td>
                    <Link href={`/Staff/SingleStudent/${student._id}`} className={styles.btn}>
                      <button>View</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
