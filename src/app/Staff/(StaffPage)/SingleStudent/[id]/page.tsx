import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Avatar from "../../../../../../public/noavatar.png";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <Image src={Avatar} alt="" className={styles.img} />
      </div>
      <div className={styles.seperator}></div>

      <div className={styles.details}>
        <p>
          Name : <strong>Yusuf Muhammed</strong>
        </p>
        <p>
          Matric No : <strong>21/03cmp004</strong>
        </p>
        <p>
          Department : <strong>Computer Science</strong>
        </p>
        <p>
          Faculty :{" "}
          <strong>Faculty of Computing Engineering and Technology</strong>
        </p>
        <div className={styles.imgBox}>
          <div className={styles.box}>
            <Image src={Avatar} alt="" className={styles.img} />
          </div>
          <div className={styles.box}>
            <Image src={Avatar} alt="" className={styles.img} />
          </div>
          <div className={styles.box}>
            <Image src={Avatar} alt="" className={styles.img} />
          </div>
        </div>
        <div className={styles.btns}>
          <button className={styles.accept}>Accept</button>
          <button className={styles.reject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
