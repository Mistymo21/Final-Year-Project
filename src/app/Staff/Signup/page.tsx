"use client";

import React, { useEffect } from "react";
import styles from "./StaffReg.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    staff_id: "",
    unit: "",
    faculty: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  // const [passwordMismatchError, setPasswordMismatchError] = React.useState('');
  const [confirmPasswordMismatchError, setConfirmPasswordMismatchError] =
    React.useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      setConfirmPasswordMismatchError("Password does not match!!!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/staff/signup", user);
      console.log("Signup successful", response.data);
      router.push("/Staff/Login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
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
      user.staff_id.length > 0 &&
      user.unit.length > 0 &&
      user.faculty.length > 0 
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
            <form action="#" className={styles.form} onSubmit={onSignup}>
              <h1 className={styles.heading}>
                {loading ? "Processing..." : " Signup"}
              </h1>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className={styles.formE}>
                <label htmlFor="#firstname">Firstname</label>
                <input
                  type="text"
                  required
                  value={user.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  placeholder="Firstname"
                />
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  required
                  value={user.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                  placeholder="Lastname"
                />
                <label htmlFor=" staff_id">Staff Id</label>
                <input
                  type="text"
                  required
                  value={user.staff_id}
                  onChange={(e) =>
                    setUser({ ...user, staff_id: e.target.value })
                  }
                  placeholder="Staff_id"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="johndoe@alhikmah.edu.ng"
                />
                <label htmlFor="unit">Unit</label>
                <select
                  name="unit"
                  id="unit"
                  value={user.unit}
                  onChange={(e) => setUser({ ...user, unit: e.target.value })}>
                  <option value="hidden" className="text-black">
                    Choose unit
                  </option>
                  <option value="Faculty Officer" className="text-black">
                    Faculty Officer
                  </option>
                  <option value="HOD" className="text-black">
                    HOD
                  </option>
                  <option value="Level adviser" className="text-black">
                    Level adviser
                  </option>
                </select>

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

  

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Password"
                />
                <label htmlFor="confirm_password">Confirm password</label>
                <input
                  type="password"
                  required
                  value={user.confirm_password}
                  onChange={(e) =>
                    setUser({ ...user, confirm_password: e.target.value })
                  }
                  placeholder="Confirm password"
                />
                {confirmPasswordMismatchError && (
                  <p style={{ color: "red" }}>{confirmPasswordMismatchError}</p>
                )}
              </div>
              <div className={styles.btnWrap}>
                <button className={styles.btn} onClick={onSignup}>
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
