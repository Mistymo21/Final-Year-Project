"use client";
import React, { useEffect } from "react";
import styles from "./userStu.module.css";
import axios from "axios";
import { toast } from "react-toastify";
const user = () => {
  const [student, setStudent] = React.useState("");
  const [profileImg, setProfileImg] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  useEffect(() => {
    const studentData = localStorage.getItem("student");
    if (studentData) {
      const student = JSON.parse(studentData);
      setStudent(student);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("matric_no", student?.matricNumber);
    if (!file || !student?.matricNumber) {
      toast.error("Please provide all fields");
      return;
    }

    try {
      toast.info("Uploading Profile Image...");

      const response = await axios.patch(
        "/api/user/student/upload-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
      
      const profileImageUrl = response.data.student.profileImageUrl;
      console.log("Profile Image URL:", profileImageUrl);

      const storedStudent = JSON.parse(localStorage.getItem("student"));
      const updatedStudent = {
        ...storedStudent,
        profileImg: profileImageUrl,
      };
      localStorage.setItem("student", JSON.stringify(updatedStudent));
      console.log("Updated student:", updatedStudent);
      if (response.status === 200) {
        toast.success("Signature uploaded successfully");
        setProfileImg(response.data.student.profileImageUrl);
        setFile(null);
        setPreview(null);
      } else {
        toast.error("Error uploading signature");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>User</h1>
      <div className={styles.signContainer}>
        <p>Please upload your signature for easy clearance</p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                value={`${student?.firstName} ${student?.lastName}`}
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label>Matric No</label>
              <input type="text" value={`${student?.matricNumber} `} disabled />
            </div>
            <div className={`${styles.formGroup} ${styles.fileUpload}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="image"
              />
              <div className={styles.imagePreview}>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                )}
              </div>
              <button type="submit" className={styles.btn}>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default user;
