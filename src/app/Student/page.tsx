import React from "react";
import "./Student.css";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="parent-wrapper">
        <div className="child-wrapper">
          <div className="student btnChs">
            <Link href="Student/Login">
              <button>Login</button>
            </Link>
          </div>
          <div className="student btnChs">
            <Link href="Student/SignUp">
              <button>Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
