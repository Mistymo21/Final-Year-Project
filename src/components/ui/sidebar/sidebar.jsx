"use client"
import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import Noava from "../../../../public/noavatar.png";


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Staff/HOD",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path:"/Staff/User",
        icon: <MdSupervisedUserCircle />,
      },
     
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/Staff/Settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
const studentItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Student/StudentPage",
        icon: <MdDashboard />,
      },
      {
        title: "User",
        path:"/Student/User",
        icon: <MdSupervisedUserCircle />,
      },
     
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "Staff/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

export const Sidebar = () => {
  const [staff, setStaff] = React.useState(null);

  React.useEffect(() => {
    const storedStaff = localStorage.getItem("staff");
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
    }
  }, []); 

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={Noava}
          alt="No avatar"
          height={50}
          width={50}
          className={styles.userImage}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>{`${staff?.firstName} ${staff?.lastName}` || ""}</span>
          <span className={styles.usertitle}>{staff?.unit}</span>
        </div>
      </div>
      <ul className={styles.lists}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            {cat.title}
            <span className={styles.cat}>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};



export const StudentSidebar = () =>{
  const [student, setStudent] = React.useState(null);
  React.useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []); 
  return (
    <div className={styles.containers}>
      <div className={styles.users}>
        <Image
          src={Noava}
          alt="No avatar"
          height={50}
          widht={50}
          className={styles.userImages}
        />
        <div className={styles.userDetail}>
        <span className={styles.usernames}>{`${student?.firstName} ${student?.lastName}` || ""}</span>
          <span className={styles.usertitles}> 400 </span>
        </div>
      </div>
      <ul className={styles.list}>
        {studentItems.map((cat) => (
          <li key={cat.title}>
            {cat.title}
            <span className={styles.cats}>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <button className={styles.logouts}>
        <MdLogout />
        Logout
      </button>
    </div>
  )
}