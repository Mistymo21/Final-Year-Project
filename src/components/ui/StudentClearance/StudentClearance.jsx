"use client";
import React, { useEffect, useState } from "react";
import styles from "./StudentClearance.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Link from "next/link";

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
  "Studio Manager",
];

const StudentClearance = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [student, setStudent] = useState(null);
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clearanceData, setClearanceData] = useState({});

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) setStudent(storedStudent);
  }, []);

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    if (storedStaff) setStaff(storedStaff);
  }, []);

  useEffect(() => {
    const fetchClearanceData = async () => {
      if (!student?.matricNumber) return;

      try {
        const response = await axios.get("/api/clearance/student/getUpdate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
          },
        });

        setClearanceData(response.data.clearance || {});
        console.log("Clearance data:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setClearanceData(null);
          toast.error("No clearance submission found yet.");
        } else {
          console.error("Error fetching clearance data:", error);
          toast.error("Error fetching clearance data.");
        }
      }
    };
    fetchClearanceData();
  }, [student?.matricNumber]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Image Handler

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


     if (!student?.profileImg) {
          toast.error("Student Image not found. Proceed to user to upload image");
          return;
        }

    if (images.length === 0) {
      alert("Please upload all required images.");
      setLoading(false);
      return;
    }

    

    const formData = new FormData();
    formData.append(
      "student_name",
      `${student?.firstName} ${student?.lastName}`
    );
    formData.append("matric_no", student?.matricNumber);
    formData.append("profile_image", student?.profileImage);
    formData.append("department", student?.department);
    formData.append("faculty", student?.faculty);
    formData.append("level", "400");
    formData.append("staff_id", staff?.staff_id);

    images.forEach((image) => {
      formData.append("images", image);
    });



    try {
      const response = await axios.post("/api/clearance/student", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
        },
      });
      toast.success("Submitted successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const latestHistory = clearanceData?.clearanceHistory || [];
  const lastEntry = latestHistory[latestHistory.length - 1];

  const rejectionEntry = [...latestHistory]
    .reverse()
    .find((item) => item.status === "rejected");

  let currentUnit = null;

  if (rejectionEntry) {
    currentUnit = rejectionEntry.unit;
  } else if (latestHistory.length > 0) {
    const approvedUnits = latestHistory
      .filter((entry) => entry.status === "approved")
      .map((entry) => entry.unit);

    const nextPendingUnit = clearanceStages.find(
      (unit) => !approvedUnits.includes(unit)
    );

    currentUnit = nextPendingUnit || "Clearance Completed";
  } else {
    currentUnit = clearanceStages[0]; // First stage
  }

  return (
    <div className={styles.container}>
      <h1>Student Clearance</h1>

      <div className={styles.upload}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <label>Name: </label>
            <input
              value={student ? `${student.firstName} ${student.lastName}` : ""}
              disabled
            />

            <label>Matric No:</label>
            <input value={student?.matricNumber || ""} disabled />

            <label>Department:</label>
            <input value={student?.department || ""} disabled />

            <label>Faculty:</label>
            <input value={student?.faculty || ""} disabled />

            <label>Level: </label>
            <input value="400" disabled />

            <div className={styles.fileInputWrapper}>
              <span>
                <h2>Upload Clearance Document</h2>
                <p>Please upload your clearance documents as a single file.</p>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                name="images"
              />
              <div className={styles.imagePreviews}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className={styles.deleteButton}>
                      Delete Image
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}>
            {/* {loading ? "Uploading..." : "Upload All"} */}
            Upload
          </button>
        </form>
      </div>

      {/* Rejection Box */}
      {rejectionEntry && (
        <div className={styles.rejectionBox}>
          <p className={styles.rejectedBy}>
            Rejected by: <b>{rejectionEntry.unit}</b>
          </p>
          <p className={styles.rejectionReason}>
            Reason: {rejectionEntry.comment || "No reason provided"}
          </p>
        </div>
      )}

      {/* Current Unit */}
      {currentUnit && (
        <h2>
          {currentUnit === "Clearance Completed" ? (
            "Your clearance is completed"
          ) : (
            <>
              <span className={styles.currentUnit}>
                Your clearance is currently with <b>{currentUnit}</b>
              </span>
            </>
          )}
        </h2>
      )}
      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>S/N</th>
              <th className={styles.tableHeaderCell}>Unit</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Comment</th>
              <th className={styles.tableHeaderCell}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {clearanceStages.map((stage, index) => {
              const historyEntry = latestHistory.find(
                (item) => item.unit === stage
              );

              return (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{index + 1}</td>
                  <td className={styles.tableCell}>{stage}</td>
                  <td
                    className={`${styles.tableCell} ${
                      historyEntry
                        ? historyEntry.status === "approved"
                          ? styles.statusCleared
                          : historyEntry.status === "rejected"
                          ? styles.statusRejected
                          : styles.statusPending
                        : styles.statusPending
                    }`}>
                    {historyEntry ? historyEntry.status : "Pending"}
                  </td>
                  <td className={styles.tableCell}>
                    {historyEntry?.comment || "-"}
                  </td>
                  <td className={styles.tableCell}>
                    {historyEntry?.status !== "pending" &&
                    historyEntry?.updatedAt
                      ? moment(historyEntry.updatedAt).calendar(null, {
                          sameDay: "DD/MM/YYYY",
                          lastDay: "DD/MM/YYYY",
                          lastWeek: "dddd",
                          sameElse: "DD/MM/YYYY",
                        })
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
       <div className={styles.right}>
          <Link href="/Student/Print" className={styles.link}>
            Print Clearance
          </Link>
        </div>
    </div>
  );
};

export default StudentClearance;
