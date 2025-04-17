import React from "react";
import styles from "./student.module.css"
import Link from "next/link";

function page() {
  return (
    <>
      {/* <div className="parent-wrapper">
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
      </div> */}
       <div className={styles.container}>
    <div className={styles.buttons}>
        <Link href="Student/Login">
      <button>
      
      Login
      </button>
        </Link>
        <Link href="Student/Signup">
      <button>
        
         Signup
      </button>
        </Link>
    </div>
  </div>
    </>
  );
}

export default page;
