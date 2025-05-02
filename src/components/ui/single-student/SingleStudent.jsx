"use client";
import React, { useEffect, useState } from "react";
import styles from "./SingleStudent.module.css";
import Image from "next/image";
import Avatar from "../../../../public/noavatar.png";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const SingleUserPage = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const studentId = pathname.split("SingleStudent")[1];
  const [student, setStudent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/clearance/student/getStudentSubmission/${studentId}`
        );
        setStudent(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching student data...");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleAccept = () => {
    alert("Student accepted");
  }


  const handleReject = () => {
    alert("Student rejected");
  }


  
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : student ? (
        <div className={styles.container}>
          <div className={styles.Info}>
            <Image src={Avatar} alt="Student Avatar" className={styles.img} />
          </div>
          <div className={styles.seperator}></div>

          <div className={styles.details}>
            <p>
              Name: <strong>{student.studentName}</strong>
            </p>
            <p>
              Matric No: <strong>{student.matricNo}</strong>
            </p>
            <p>
              Department: <strong>{student.department}</strong>
            </p>
            <p>
              Faculty: <strong>{student.faculty}</strong>
            </p>

            <div className={styles.imgBox}>
              {student.imageUrls?.map((url, index) => (
                <div key={index} className={styles.box}>
                  <Image
                    src={url}
                    alt={`Student Image ${index + 1}`}
                    className={styles.img}
                    width={200}
                    height={200}
                    onClick={() => setSelectedImage(url)} // preview image on click
                  />
                </div>
              ))}
            </div>

            <div className={styles.btns}>
              <button className={styles.reject} onClick={handleReject}>Reject</button>
              <button className={styles.accept} onClick={handleAccept}>Accept</button>
            </div>
          </div>

          {/* Modal Preview */}
          {selectedImage && (
            <div className={styles.modal} onClick={() => setSelectedImage(null)}>
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className={styles.fullscreenImage}
              />
            </div>
          )}
        </div>
      ) : (
        <h1>No student data found.</h1>
      )}
    </>
  );
};

export default SingleUserPage;
