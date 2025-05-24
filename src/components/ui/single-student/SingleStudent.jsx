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
  const studentId = pathname.split("/").pop();
  const [student, setStudent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [staff, setStaff] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionComment, setRejectionComment] = useState("");
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    const storedStudentImage = JSON.parse(localStorage.getItem("student"));
    if (storedStudentImage) {
      setStudentImage(storedStudentImage);
    }
  }, []);
  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    if (storedStaff) {
      setStaff(storedStaff);
    }
  }, []);

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
  }, [studentId]);

  // Directly approve without signature modal, sending stored signatureUrl
  const handleAccept = async () => {
    if (!staff?.signature) {
      toast.error("Staff signature not found. Cannot approve.");
      return;
    }

    

  try {
    setLoading(true);

    const response = await axios.patch(
      `/api/clearance/staff/approve/${studentId}`,
      {
        unit: staff.unit,
        reviewedByName: `${staff.firstName} ${staff.lastName}`
      }
    );

    toast.success("Student approved!");
    // Optionally refresh student data or redirect
  } catch (error) {
    console.error("Error approving student", error);
    toast.error(error.response?.data?.message || "Error processing approval.");
  } finally {
    setLoading(false);
  }
};


  const handleReject = async () => {
    if (!rejectionComment) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    if (!staff?.unit) {
      toast.error("Staff unit not found. Cannot reject.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/clearance/staff/reject/${studentId}`,
        {
          comment: rejectionComment,
          unit: staff.unit,
          reviewerName: `${staff?.firstName} ${staff?.lastName}`,
        }
      );

      toast.success("Student rejected!");
      setIsRejectModalOpen(false);
      setRejectionComment("");
    } catch (error) {
      console.error("Error rejecting student", error);
      toast.error(error.response?.data?.message || "Error processing the rejection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : student ? (
        <div className={styles.container}>
          <div className={styles.Info}>
            <Image src={studentImage?.profileImg || Avatar} alt="Student Avatar" className={styles.img} width={200} height={200}/>
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
              <button className={styles.reject} onClick={() => setIsRejectModalOpen(true)}>
                Reject
              </button>
              <button className={styles.accept} onClick={handleAccept}>
                Accept
              </button>
            </div>
          </div>

          {/* Reject Modal */}
          {isRejectModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Provide Rejection Comment</h2>
                <textarea
                  value={rejectionComment}
                  onChange={(e) => setRejectionComment(e.target.value)}
                  placeholder="Reason for rejection..."
                />
                <div className={styles.modalButtons}>
                  <button onClick={handleReject}>Submit</button>
                  <button onClick={() => setIsRejectModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview Modal */}
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
