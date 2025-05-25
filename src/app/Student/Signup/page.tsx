"use client";
import React from "react";
import {  useEffect } from "react";
import styles from "./StudentReg.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    matric_no: "",
    email: "",
    faculty: "",
    department: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [confirmPasswordMismatchError, setConfirmPasswordMismatchError] =
    React.useState("");

  const onSignupStud = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      setConfirmPasswordMismatchError("Password does not match!!!");
      setError(true)
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/student/signup", user);
      toast.success("Signup successful");
      console.log(response.data)
      
      router.push("Login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.firstname.length > 0 &&
      user.email.length > 0 &&
      user.confirm_password.length > 0 &&
      user.password.length > 0 &&
      user.matric_no.length > 0 


    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (
      user.password &&
      user.confirm_password &&
      user.password !== user.confirm_password
    ) {
      setConfirmPasswordMismatchError("Password does not match!!!");
    } else {
      setConfirmPasswordMismatchError("");
    }
  }, [user.password, user.confirm_password]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.mt}>
            <form action="#" className={styles.form} onSubmit={onSignupStud}>
              <h1 className={styles.heading}>
                {loading ? "Processing..." : " Signup"}
              </h1>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className={styles.formE}>
                <label htmlFor="#">Firstname</label>
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={user.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                />

                <label htmlFor="#">Lastname</label>
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={user.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                />

                <label htmlFor="#">Matric no</label>
                <input
                  type="text"
                  required
                  placeholder="Matric No"
                  value={user.matric_no}
                  onChange={(e) =>
                    setUser({ ...user, matric_no: e.target.value })
                  }
                />

                <label htmlFor="#">Email</label>
                <input
                  type="email"
                  placeholder="johndoe@alhikmah.edu.ng"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <label htmlFor="faculty">Faculty</label>
                <select
                  name="faculty"
                  id="faculty"
                  value={user.faculty}
                  onChange={(e) =>
                    setUser({ ...user, faculty: e.target.value })
                  }>
                  <option value="hidden">Choose Faculty</option>
                  <option value="Faculty Of Computing Engineering & Technology">
                    Faculty Of Computing Engineering & Technology
                  </option>
                  <option value="Natural and Applied Science">
                    Faculty Of Natural and Applied Science
                  </option>
                </select>
                

                <label htmlFor="faculty">Department</label>
                <select
                  name="dept"
                  id="dept"
                  value={user.department}
                  onChange={(e) =>
                    setUser({ ...user, department: e.target.value })
                  }>
                  <option value="hidden">Choose Department</option>
                  <option value="Computer">
                   Computer Science
                  </option>
                  <option value="Software">
                    Software
                  </option>
                  <option value="Cyber">Cyber Security</option>
                </select>

                <label htmlFor="#">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <label htmlFor="#">Confirm password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={user.confirm_password}
                  onChange={(e) =>
                    setUser({ ...user, confirm_password: e.target.value })
                  }
                />
                {confirmPasswordMismatchError && (
                  <p style={{ color: "red" }}>{confirmPasswordMismatchError}</p>
                )}
              </div>
              <div className={styles.btnWrap}>
                <button className={styles.btn} onClick={onSignupStud}>
                  {buttonDisabled ? "No Signup" : "Signup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
