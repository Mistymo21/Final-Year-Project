"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Logo from "@/app/assets/logo_hui.png";
import Link from "next/link";

const lists = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Student",
    dropDown: [
      {
        title: "Login",
        url: "/Student/Login",
      },
      {
        title: "Sign Up",
        url: "/Student/Signup",
      },
    ],
  },
  {
    id: 3,
    title: "Staff",
    dropDown: [
      {
        title: "Login",
        url: "/Staff/Login",
      },
      {
        title: "Sign Up",
        url: "/Staff/Signup",
      },
    ],
  },
];

const Navbar = () => {
  const [dropDown, setDropDown] = useState(null);

  const toggleDropDown = (title) => {
    setDropDown(dropDown === title ? null : title);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image src={Logo} alt="logo" width={200} />
        <span>E-clearance System</span>
      </div>
      <div className={styles.right}>
        {lists.map((li) => (
          <div key={li.id} className={styles.dropDown}>
            {li.dropDown ? (
              <>
                <button
                  onClick={() => toggleDropDown(li.title)}
                  className={styles.btn}>
                  {li.title}
                </button>
                {dropDown === li.title && (
                  <div className={styles.link}>
                    {li.dropDown.map((item, index) => (
                      <Link key={index} href={item.url}>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={li.url}>{li.title}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
