"use client";
import { useState } from "react";
import React from 'react'
import styles from './layout.module.css'
import {StudentSidebar} from '@/components/ui/sidebar/sidebar'
import { MdMenu } from "react-icons/md";
import Notification from "@/components/ui/notification/notification";
const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        <MdMenu />
      </button>

      {/* Sidebar (visible or hidden based on state) */}
      <div className={`${styles.menu} ${open ? styles.showMenu : ""}`}>
        <StudentSidebar isOpen={open} />
      </div>

      {/* Page Content */}
      <div className={styles.content}>
        {children}
        <Notification />

      </div>
    </div>
  );
};
  
  export default Layout
  

