import styles from "./settings.module.css";
import Link from "next/link";

const settings = ({staff}) => {

 
  return (
    <div className={styles.container}>
      <h1>Staff Settings</h1>
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <h2>Profile</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={staff?.firstName} readOnly/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="unit">Unit</label>
              <input type="text" id="unit" name="unit" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <button className={styles.btn}>Upload</button>
          </form>
        </div>
        <div className={styles.center}>
          <h2>Account</h2>
          <div className={styles.account}>
            <Link href="">Change password</Link>
            <span> - </span>
          </div>
          <div className={styles.account}>
            <Link href="">Two-factoractor authentication</Link>
            <span> - </span>
          </div>
        </div>
        <div className={styles.bottom}>

        <button className={`${styles.btn} ${styles.btnLogout}`}>Log out</button>
        </div>

      </div>
    </div>
  );
};

export default settings;
