"use client";
import React from "react";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";


const StaffSinglePage = () => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<File>();
  const handleImageChange = (e) => {
    if(e.target.files){
      setImage(e.target.files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all required images are uploaded
    if (!image) {
       alert("Please upload all required images.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image)

    // Check if all required documents are uploaded
    if (!formData.has("image")) {
      alert("Please upload all required documents.");
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post("/api/clearance/student", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  
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
    <div className={styles.container}>
      <div className={styles.staffInfo}>
        <div className={styles.detail}>
          <span>Staff Name:</span>
          <span>
            <b>Nana Aishat</b>
          </span>
        </div>
        <div className={styles.detail}>
          <span>Role:</span>
          <span>
            <b>Level Adviser</b>
          </span>
        </div>
        <div className={styles.detail}>
          <span>Faculty:</span>
          <span>
            <b>
              Computing, Engineering <br /> and Technology
            </b>
          </span>
        </div>
      </div>

      <div className={styles.seperator}></div>

      <div className={styles.uploadDetails}>
        <div className={styles.details}>
          <h1>UPLOAD DOCUMENTS</h1>
          <p className={styles.uploadNote}>
            Note: Please ensure that the names of the files you are uploading
            are exactly as required.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputs}>
              <label>Name: </label>
              <input  value="Yusuf Muhammed" disabled/>

              <label>Matric No:</label>
              <input  value="21/03cmp004" disabled/>
              <label>Department:</label>
              <input  value="Computer Science" disabled/>
              <label>Faculty:</label>
              <input  value="Computing, Enginnering & Technology" disabled/>
              <label>Level: </label>
              <input value="400" disabled/>
              
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <button disabled={loading}>Upload All</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffSinglePage;
