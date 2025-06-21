import React from "react";
import styles from "./LandingPage.module.css";
import NavBar from "@/components/ui/NavBar/navbar";
import Link from "next/link";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";


const page = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.desc}>
        <h1>
          E-Clearance <br /> Made Easy
        </h1>
        <p>
          Submit, track and complete your <br /> university clearance from
          anywhere
        </p>
      </div>

      <div className={styles.link}>
        <Link href="#">Student</Link>
        <Link href="#">Staff</Link>
      </div>

      <div className={styles.details}>
        <h1>How it Works</h1>
        <div className={styles.descLogo}>
          <span>
            <BiSolidUserRectangle size={40}  />

            <p>Login with your credential</p>
          </span>
          <span>
            <FaCloudUploadAlt size={40} />
            <p>Upload your required documents</p>
          </span>
          <span>
            <FaCheckSquare size={40} />
            <p>Units approve your clearance</p>
          </span>
          <span>
            <IoMdPrint size={40} />
            <p>Print your clearance certificate</p>
          </span>
        </div>
        <div className={styles.mt}>
        <h1>Roles</h1>
          <div className={styles.roleDesc}>
          <span>
            <PiStudent size={40}/>
          <p>Student</p>

          </span>
          <span>
            <GiTeacher size={40}/>

            <p>HOD</p>
          </span>
          <span>
            <GiTeacher size={40}/>
          <p>DEAN</p>

          </span>
          <span>
            <IoMdAddCircleOutline size={40}/>
          <p>Others</p>

          </span>
        </div>

        </div>
      </div>

      <div className={styles.footer}>
        <p>2025 Al-Hikmah Univerity</p>
        <p>Built by Yusuf Muhammed & Panti Yusuf</p>
      </div>
    </div>
  );
};

export default page;
