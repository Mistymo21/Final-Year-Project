"use client"
import React, { useEffect } from 'react'
import styles from "./user.module.css";
import axios from 'axios';
import { toast } from 'react-toastify';
const user = () => {
  const [staff, setStaff] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null);
  useEffect(() => {
    const staffData = localStorage.getItem("staff");
    if (staffData) {
      const staff = JSON.parse(staffData);
      setStaff(staff);
    }
  },[])

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(selectedFile);
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("staff_id", staff?.staff_id);
    if (!file || !staff?.staff_id) {
      toast.error("Please provide all fields");
      return;
    }

    try {
    toast.info("Uploading signature...");

      const response = await axios.patch("/api/user/staff/upload-signature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      if (response.status === 200) {
        toast.success("Signature uploaded successfully");
        setSignature(response.data.staff.signature);
        setFile(null);
        setPreview(null);
      } else {
        toast.error("Error uploading signature");
      }

      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message)
      
    }
  }

  return (
    <div className={styles.container}>
      <h1>User</h1>
      <div className={styles.signContainer}>
        <p>Please upload your signature for easy clearance
        </p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label >Name</label>
            <input type="text" value={`${staff?.firstName} ${staff?.lastName}`} disabled />
            </div>
            <div className={styles.formGroup}>
            <label >Staff_Id</label>
            <input type="text" value={`${staff?.staff_id} `} disabled />
            </div>
            <div className={`${styles.formGroup} ${styles.fileUpload}`}>
            <input type="file" accept="image/*" onChange={handleFileChange} name='image'/>
            <div className={styles.imagePreview}>
              {preview && <img src={preview} alt="Preview" className={styles.previewImage} />}  
            </div>  
            <button type="submit" className={styles.btn}>Upload</button>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default user

