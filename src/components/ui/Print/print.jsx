"use client";
import React, { useEffect, useState } from "react";
import styles from "./print.module.css";
import Logo from "@/app/assets/logo_hui.png";
import Image from "next/image";
import NoAva from "@/app/assets/noavatar.png";
import moment from "moment/moment";
import axios from "axios";
const print = () => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    setStaff(storedStaff);
  }, []);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    const matricNo = storedStudent?.matricNumber;

    const fetchClearanceDetails = async () => {
      const response = await axios.get(
        `/api/clearance/getClearance?matricNo=${encodeURIComponent(matricNo)}`
      );
      console.log(response);
      setStudent({...response.data, matricNo});
    };
    fetchClearanceDetails();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" height={100} />
        </div>
        <div className={styles.text}>
          <h1>REGISTER'S OFFICE</h1>
          <p>ACADEMIC AFFAIRS DIVISION</p>
          <p>CLEARANCE CERTIFICATION FOR GRADUATING STUDENT</p>
          <p>2024/2025 ACADEMIC SESSION</p>
        </div>
      </div>
      <div className={styles.studentInfo}>
        <div className={styles.details}>
          <div className={styles.info}>
            <span>Fullname:</span>
            <span>
              <b>{student?.studentName} </b>
            </span>
          </div>
          <div className={styles.info}>
            <span>Matric No:</span>
            <span>
              <b>{student?.matricNo || "not found"}</b>
            </span>
          </div>
          <div className={styles.info}>
            <span>Faculty:</span>
            <span>
              <b>{student?.faculty}</b>
            </span>
          </div>
          <div className={styles.info}>
            <span>Department:</span>
            <span>
              <b>{student?.department}</b>
            </span>
          </div>
          <div className={styles.info}>
            <span>Academic Semester:</span>
            <span>
              <b>2024/2025</b>
            </span>{" "}
            || &nbsp;
            <span>Academic Level:</span>
            <span>
              <b>400</b>
            </span>
          </div>
        </div>
        <div className={styles.img}><p>
          
          Attach <br />your <br />passport
          </p>
          </div>
      </div>

      <p className={styles.desc}>
        The above named final year student will be graduating from this
        University in 2024/2025 Academic Session. Proceed to print the appended
        signature{" "}
      </p>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>UNIT</th>
              <th>NAME OF CLEARING OFFICER</th>
              <th>STATUS</th>
              <th>SIGNATURE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{staff?.unit}</td>
              <td>{student?.reviewedBy || "Waiting for staff to update"} </td>
              <td
                className={
                  student?.status === "approved"
                    ? styles.approved
                    : student?.status === "rejected"
                    ? styles.rejected
                    : styles.pending
                }>
                {student?.status}{" "}
              </td>
              <td>
                {student?.status === "approved" && student?.staffsignature ? (
                  <Image
                    src={student?.staffsignature}
                    alt=""
                    width={100}
                    height={50}
                  />
                ) : (
                  "Not Available"
                )}
              </td>
              <td>{moment(student?.updatedAt).format("DD/MM/YYYY")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.bottom}>
        <h2>BURSAR/DEAN, STUDENT AFFAIRS/DEPUTY REGISTER (ACADEMIC)</h2>

        <p>
          This is to certify that the above named student has been dully
          cleared. Kindly accord him/her necessary assistance such as issuance
          of NYSC Call-Up letter and University Statement of Result/Certificate,
          etc.
          <br />
          <br />
          Thank you
        </p>
        <div>
          <p>
            <b>S.S Sinkaiye</b>
          </p>
          <p>Deputy Registrar(Academic)</p>
          <p>For Registrar</p>
        </div>
      </div>
    </div>
  );
};

export default print;
