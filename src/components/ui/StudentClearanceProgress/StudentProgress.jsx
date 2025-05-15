import React from 'react';
import styles from './StudentProgress.module.css';

const clearanceStages = [
  "Head of Department",
  "Faculty Officer",
  "Dean of Faculty",
  "Hostel Warden",
  "Director of Clinic",
  "Director of Sports",
  "Director of Works",
  "University Librarian",
  "Dean, Student Affairs",
  "Stores Officer",
  "Accountant (Students)",
  "University Alumni Association",
  "Director, CPPS (Top-Up only)",
  "Director, IOE (Sandwich only)",
  "Studio Manager"
];

const currentStatus = {
  stageIndex: 4, // 0-based index of current clearance stage
  status: "Rejected", // or "In Progress", "Cleared"
  rejectedBy: "Hostel Warden",
  rejectionReason: "Outstanding hostel dues"
};

const StudentProgress = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clearance Progress</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>S/N</th>
              <th className={styles.tableHeaderCell}>Unit</th>
              <th className={styles.tableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {clearanceStages.map((unit, index) => {
              let status;
              let statusClass;
              if (index < currentStatus.stageIndex) {
                status = "Cleared";
                statusClass = styles.statusCleared;
              } else if (index === currentStatus.stageIndex) {
                status = currentStatus.status;
                statusClass = currentStatus.status === "Cleared" 
                  ? styles.statusCleared 
                  : currentStatus.status === "Rejected" 
                    ? styles.statusRejected 
                    : styles.statusPending;
              } else {
                status = "Pending";
                statusClass = styles.statusPending;
              }

              return (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{index + 1}</td>
                  <td className={styles.tableCell}>{unit}</td>
                  <td className={`${styles.tableCell} ${statusClass}`}>
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {currentStatus.status === "Rejected" && (
        <div className={styles.rejectionBox}>
          <p className={styles.rejectedBy}>
            Rejected by {currentStatus.rejectedBy}
          </p>
          <p className={styles.rejectionReason}>
            Reason: {currentStatus.rejectionReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentProgress; 