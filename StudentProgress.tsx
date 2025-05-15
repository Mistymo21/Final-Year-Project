import React, { useState, useRef } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would implement the actual file upload logic
      console.log('Uploading file:', selectedFile.name);
      // Reset the file input after upload
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getProgressWidth = () => {
    const totalStages = clearanceStages.length - 1;
    const completedStages = currentStatus.stageIndex;
    return `${(completedStages / totalStages) * 100}%`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clearance Progress</h1>

      {/* Progress Tracker */}
      <div className={styles.progressTracker}>
        <div className={styles.progressLine} />
        <div 
          className={styles.progressLineFilled} 
          style={{ width: getProgressWidth() }}
        />
        {clearanceStages.map((stage, index) => {
          let pointClassName = styles.stagePoint;
          if (index < currentStatus.stageIndex) {
            pointClassName = `${styles.stagePoint} ${styles.stagePointCompleted}`;
          } else if (index === currentStatus.stageIndex) {
            pointClassName = `${styles.stagePoint} ${
              currentStatus.status === "Rejected" 
                ? styles.stagePointRejected 
                : styles.stagePointActive
            }`;
          }

          return (
            <div key={index} className={styles.stage}>
              <div className={pointClassName}>
                {index + 1}
              </div>
              <span className={styles.stageLabel}>{stage}</span>
            </div>
          );
        })}
      </div>

      {/* Upload Section */}
      <div className={styles.uploadSection}>
        <h2 className={styles.uploadTitle}>Upload Required Documents</h2>
        <p className={styles.uploadDescription}>
          Please upload any required documents for the current clearance stage.
          Accepted file formats: PDF, JPG, PNG (max 5MB)
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className={styles.uploadInput}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.uploadButton}>
          {selectedFile ? selectedFile.name : 'Choose File'}
        </label>
        {selectedFile && (
          <button 
            onClick={handleUpload}
            className={styles.uploadButton}
            style={{ marginLeft: '1rem' }}
          >
            Upload Document
          </button>
        )}
      </div>

      {/* Existing Table Section */}
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