"use client";
import React, { useEffect, useState } from "react";
import styles from "./SingleStaff.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const StaffSinglePage = () => {
  const pathname = usePathname();
  const staffId = pathname.split("SingleStaff")[1];
  const [staff, setStaff] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // Store an array of selected images
  const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true); // Set loading state while fetching data
      try {
        const response = await axios.get(`/api/clearance/staff/${staffId}`);
        setStaff(response.data); // Assuming response contains the staff data directly
      } catch (error) {
        console.log(error);
        toast.error("There was an error while fetching staff.");
      } finally {
        setLoading(false); // Reset loading state once the data is fetched
      }
    };
    fetchStaff();
  }, [staffId]);

  // Fetch student data from localStorage and update state
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setStudent(storedStudent); // Set the student data from localStorage
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to array
      setImages((prevImages) => [...prevImages, ...selectedFiles]); // Add selected images to the array

      // Generate preview URLs for selected images
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]); // Add preview URLs to the array
    }
  };

  const handleImageDelete = (index) => {
    // Remove selected image at the given index
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
    // Append student info to FormData
    formData.append("student_name", `${student?.firstName} ${student?.lastName}`);
    formData.append("matric_no", student?.matricNumber);
    formData.append("department", student?.department);
    formData.append("faculty", student?.faculty);
    formData.append("level", "400");  // Adjust level if needed, as it's static here

    // Append images to FormData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("/api/clearance/student", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      toast.success("Submitted successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("There was an error while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {staff ? (
        <div className={styles.container}>
          <h1 className={styles.heading}>Staff Details</h1>

          <div className={styles.staffInfo}>
            <div className={styles.detail}>
              <span>Staff Name:</span>
              <span>
                <b>{`${staff?.firstName} ${staff?.lastName}`}</b>
              </span>
            </div>
            <div className={styles.detail}>
              <span>Staff Id:</span>
              <span>
                <b>{staff?.staff_id}</b>
              </span>
            </div>
            <div className={styles.detail}>
              <span>Unit:</span>
              <span>
                <b>{staff?.unit}</b>
              </span>
            </div>
            <div className={styles.detail}>
              <span>Faculty:</span>
              <span>
                <b>{staff.faculty}</b>
              </span>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className={styles.uploadDetails}>
            <div className={styles.details}>
              <h1>UPLOAD DOCUMENTS</h1>
              <p className={styles.uploadNote}>
                Note: Please ensure that the names of the files you are uploading are exactly as required.
              </p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputs}>
                  <label>Name: </label>
                  <input value={student?.firstName + " " + student?.lastName} disabled />

                  <label>Matric No:</label>
                  <input value={student?.matricNumber} disabled />

                  <label>Department:</label>
                  <input value={student?.department} disabled />

                  <label>Faculty:</label>
                  <input value={student?.faculty} disabled />

                  <label>Level: </label>
                  <input value="400" disabled />

                  {/* File Input */}
                  <div className={styles.fileInputWrapper}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple
                      name = "images"
                    />
                    <div className={styles.imagePreviews}>
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className={styles.imagePreview}>
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            className={styles.deleteButton}
                          >
                            Delete Image
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button disabled={loading}>Upload All</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default StaffSinglePage;
