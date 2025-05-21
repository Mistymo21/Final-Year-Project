"use client";
import React, { useEffect } from "react";
import "./Login.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


function Loginpage() {
  const router = useRouter();
  const [isloading, setIsloading] = React.useState(false);
  const [user, setUser] = React.useState({
    matric_no: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const Login = async () => {
    try {
      setIsloading(true);
      const response = await axios.post("/api/user/student/login", user);
      
      if (response.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("student", JSON.stringify(response.data.student));
        localStorage.setItem("studentToken", response.data.token);
        router.push("StudentPage");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid matric number or password");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    console.log("User state updated:", user); // Debug user state
    if (user.matric_no.length === 0 || user.password.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <>
      <div className="wrap-container">
        <div className="Loginwrapper">
          <div className="log-mtx">
            <form action="#" className="slogin-form">
              <h1 className="heading">
                {isloading ? "Processing" : "Login"}
              </h1>
              <div className="login-formD">
                <label htmlFor="#">Matric no</label>
                <input
                  type="text"
                  placeholder="Matric No"
                  value={user.matric_no}
                  onChange={(e) =>
                    setUser({ ...user, matric_no: e.target.value })
                  }
                />
                <label htmlFor="#">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
             

              <div className="btnWrap">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    Login();
                  }}
                >
                  {buttonDisabled ? "No Login" : "Login"}
                </button>
              </div>
              <div className="sfgnBtn mb-3">
                <span>
                  <Link href="Login/ForgotPassword">
                    Forgot Password? Click here...
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;