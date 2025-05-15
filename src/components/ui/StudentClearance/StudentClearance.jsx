"use client";
import React, { useEffect, useState } from "react";
import styles from "./StudentClearance.module.css";
import axios from "axios";
import { toast } from "react-toastify";

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

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setStudent(storedStudent);
    }
  }, []);
  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    if (storedStaff) {
      setStaff(storedStaff);
    }
  }, []);

  const currentStatus = {
    stageIndex: 4, // 0-based index of current clearance stage
    status: "Rejected", // or "In Progress", "Cleared"
    rejectedBy: "Hostel Warden",
    rejectionReason: "Outstanding hostel dues",
  };

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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

  return (
    <div className={styles.container}>
      <h1>Student Clearance</h1>
      <div className={styles.upload}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <label>Name: </label>
            <input
              value={student?.firstName + " " + student?.lastName || ""}
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

            <label>Status</label>
            <p>Pending</p>
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
          <button>Upload All</button>
        </form>
      </div>
      <div className={styles.unit}>
        <p>
          Your clearance is with: <b>Faculty Officer</b>
        </p>
      </div>
      <div>
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
            {clearanceStages.map((unit, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{index + 1}</td>
                <td className={styles.tableCell}>{unit}</td>
                <td className={styles.tableCell}>Cleared</td>
                <td className={styles.tableCell}>No Comment</td>
                <td className={styles.tableCell}>2023-10-01</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default StudentClearance;
