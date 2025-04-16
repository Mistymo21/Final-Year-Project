import React from "react";
import styles from "./staffTable.module.css";
import Link from "next/link";
import { fetchStaffData } from "@/lib/data";
const StaffTable= async () => {
  const staffs = await fetchStaffData();
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff_id</th>
              <th>Unit</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.staff_id}>
              <td>{`${staff.firstName} ${staff.lastName}`}</td>
              <td>{staff.staff_id}</td>
              <td></td>
              <td>Computer Science</td>
              <td>20.24.24</td>
              <td>
                <Link href={`/staff/test`} className={styles.btn}>
                  <button >View</button>
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

export default StaffTable
