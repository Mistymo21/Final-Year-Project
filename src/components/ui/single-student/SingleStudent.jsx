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

  // For managing modal states
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [signature, setSignature] = useState(null);
  const [rejectionComment, setRejectionComment] = useState("");

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
    // Open the modal for signature upload when the "Accept" button is clicked
    setIsAcceptModalOpen(true);
  };

  const handleReject = () => {
    // Open the modal for rejection comment input when the "Reject" button is clicked
    setIsRejectModalOpen(true);
  };

  const handleSignatureUpload = async () => {
    if (!signature) {
      toast.error("Please upload a signature.");
      return;
    }

    try {
      // Update the student status and upload signature via your API (this is a mock API call)
      const response = await axios.post("/api/clearance/student/approve", {
        studentId,
        signature,
      });
      toast.success("Student accepted!");
      setIsAcceptModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error uploading signature", error);
      toast.error("Error processing the acceptance.");
    }
  };

  const handleRejection = async () => {
    if (!rejectionComment) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    try {
     
      const response = await axios.patch(`/api/clearance/staff/reject/${studentId}`, {
        studentId,
        comment: rejectionComment,
      });
      toast.success("Student rejected!");
      setIsRejectModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error rejecting student", error);
      toast.error("Error processing the rejection.");
    }
  };

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
              <button className={styles.reject} onClick={handleReject}>
                Reject
              </button>
              <button className={styles.accept} onClick={handleAccept}>
                Accept
              </button>
            </div>
          </div>

          {/* Accept Modal */}
          {isAcceptModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Upload Signature</h2>
                <input
                  type="file"
                  onChange={(e) => setSignature(e.target.files[0])}
                />
                <div className={styles.modalButtons}>
                  <button onClick={handleSignatureUpload}>Submit</button>
                  <button onClick={() => setIsAcceptModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
                  <button onClick={handleRejection}>Submit</button>
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
