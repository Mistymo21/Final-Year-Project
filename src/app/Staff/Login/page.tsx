"use client";
import React, { useEffect } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";


function LoginPage() {
  const router = useRouter();
  const [isloading, setIsloading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({
    staff_id: "",
    password: "",
    unit: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onLogin = async () => {
    try {
      setIsloading(true);
      console.log("Sending user data:", user);
      const response = await axios.post("/api/user/staff/login", user);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log("Redirecting to Staff Page");
        setIsLoggedIn(true);
        switch (user.unit.trim().toLowerCase()) {
          case "level adviser":
            router.push("/Staff/LA");
            break;
          case "faculty officer":
            router.push("/Staff/Faculty-Officer");
            break;
          case "hod":
            router.push("/Staff/HOD");
            break;
          default:
            console.log("Invalid unit");
        }
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    console.log("User state updated:", user);
    if (user.staff_id.length === 0 || user.password.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  if (isLoggedIn) {
    // Returning a SideBar here
    return 
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.mt}>
          <form
            action="#"
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}>
            <h1 className={styles.heading}>
              {isloading ? "Processing" : "Login"}
            </h1>
            <div className={styles.formE}>
              <label htmlFor="staff_id">Staff Id</label>
              <input
                type="text"
                value={user.staff_id}
                onChange={(e) => setUser({ ...user, staff_id: e.target.value })}
                placeholder="Staff_id"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
              />
              <label htmlFor="unit">Unit</label>
              <select
                name="unit"
                id="unit"
                value={user.unit}
                onChange={(e) => setUser({ ...user, unit: e.target.value })}>
                <option value="">Choose unit</option>
                <option value="Faculty Officer">Faculty Officer</option>
                <option value="HOD">HOD</option>
                <option value="Level Adviser">Level Adviser</option>
              </select>
            </div>
            <div className={styles.btns}>
              {/* <div className={styles.remBtn}>
                <input type="checkbox" />
                <span>Remember Me</span>
              </div> */}
              <div className={styles.fgnBtn}>
                <span>
                  <Link href="Login/ForgotPassword">Forgot Password..</Link>
                </span>
              </div>
            </div>
            <div className={styles.btnWrap}>
              <button className={styles.btn} onClick={onLogin}>
                {buttonDisabled ? "No Login" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;