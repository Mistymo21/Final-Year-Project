
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
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
     
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
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
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={Noava}
          alt="No avatar"
          height={50}
          widht={50}
          className={styles.userImage}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}> Nana Aishat</span>
          <span className={styles.usertitle}>Level Adviser</span>
        </div>
      </div>
      <ul className={styles.lists}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            {cat.title}
            <span className="styles.cat">
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
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={Noava}
          alt="No avatar"
          height={50}
          widht={50}
          className={styles.userImage}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>Yusuf Muhammed</span>
          <span className={styles.usertitle}>400 Level </span>
        </div>
      </div>
      <ul className={styles.lists}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            {cat.title}
            <span className="styles.cat">
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
  )
}