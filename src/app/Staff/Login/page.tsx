"use client";
import React, { useEffect } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/ui/notification/notification";

const Units = [
  "Head of Department",
  "Faculty Officer",
  "Dean of Faculty",
  "Hostel Warden",
  "Director, Clinic",
  "Director of Sports",
  "Director of Works",
  "University Librarian",
  "Dean, Student Affairs",
  "Stores Officer",
  "Accountant (Students)",
  "University Alumni Association",
  "Director, CPPS (Top-Up only)",
  "Director, IOE (Sandwich only)",
  "Studio Manager",
];

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
      const response = await axios.post("/api/user/staff/login", user);
      console.log(response.data);

      if (response.status === 200) {
        const staffUnit = response.data.staff.unit?.trim().toLowerCase();
        const selectedUnit = user.unit.trim().toLowerCase();

        // Check if the selected unit matches the unit from the database
        if (selectedUnit !== staffUnit) {
          toast.error("Invalid credentials: Unit mismatch");
          return;
        }else{
        toast.success("Login Successful");


        }

        localStorage.setItem("staff", JSON.stringify(response.data.staff));
        localStorage.setItem("staffToken", response.data.token);

        if (response.data.success) {
          setIsLoggedIn(true);
          toast.success(response.data.message);
        }

        switch (user.unit) {
          case "Head of Department":
            router.push("/Staff/HOD");
            break;
          case "Faculty Officer":
            router.push("/Staff/FO");
            break;
          case "Dean of Faculty":
            router.push("/Staff/DOF");
            break;
          case "Hostel Warden":
            router.push("/Staff/HW");
            break;
          case "Director, Clinic":
            router.push("/Staff/DC");
            break;
          case "Director of Sports":
            router.push("/Staff/DOS");
            break;
          case "Director of Works":
            router.push("/Staff/DOW");
            break;
          case "University Librarian":
            router.push("/Staff/UL");
            break;
          case "Dean, Student Affairs":
            router.push("/Staff/DSA");
            break;
          case "Stores Officer":
            router.push("/Staff/SO");
            break;
          case "Accountant (Students)":
            router.push("/Staff/AS");
            break;
          case "University Alumni Association":
            router.push("/Staff/UAA");
            break;
          case "Director, CPPS (Top-Up only)":
            router.push("/Staff/DCPPS");
            break;
          case "Director, IOE (Sandwich only)":
            router.push("/Staff/DIOE");
            break;
          case "Studio Manager":
            router.push("/Staff/SM");
            break;
          default:
            toast.error("Invalid unit");

        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (user.staff_id.length === 0 || user.password.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  if (isLoggedIn) {
    return null; // or return a loading state or sidebar
  }

  return (
    <>
      <Notification />
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
                  onChange={(e) =>
                    setUser({ ...user, staff_id: e.target.value })
                  }
                  placeholder="Staff_id"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Password"
                />

                <label htmlFor="unit">Unit</label>
                <select
                  name="unit"
                  id="unit"
                  value={user.unit}
                  onChange={(e) => setUser({ ...user, unit: e.target.value })}>
                  <option value="">Choose unit</option>
                  {Units.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.btns}>
                <div className={styles.fgnBtn}>
                  <span>
                    <Link href="Login/ForgotPassword">Forgot Password..</Link>
                  </span>
                </div>
              </div>

              <div className={styles.btnWrap}>
                <button className={styles.btn} disabled={buttonDisabled}>
                  {buttonDisabled ? "No Login" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
