"use client";
import React, { useEffect } from "react";
import styles from "./SingleStaff.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const StaffSinglePage = () => {
  const pathname = usePathname();
  const staffId = pathname.split("SingleStaff")[1];
  const [staff, setStaff] = React.useState(null);
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

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

            


useEffect(() => {
  const fetchStudent = async () =>{
    setLoading(true);
   try {
    const response = await axios.get(`api/getAllStudents${matricNo}`)
    setStudent(response.data);
    console.log(response.data);
    
   } catch (error) {
    console.log(error)
    toast.error("An Error occured", error)
    
   }finally{
    setLoading(false);
   }
  }
  fetchStudent()
}, [])
      




  const handleImageChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      alert("Please upload all required images.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

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
      {staff  ? (
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
                  <input value="Yusuf Muhammed" disabled />

                  <label>Matric No:</label>
                  <input value={student?.matric_no} disabled />

                  <label>Department:</label>
                  <input value="Computer Science" disabled />

                  <label>Faculty:</label>
                  <input value="Computing, Engineering & Technology" disabled />

                  <label>Level: </label>
                  <input value="400" disabled />

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
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default StaffSinglePage;
