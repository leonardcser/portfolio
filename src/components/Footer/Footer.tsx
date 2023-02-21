import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="logo">Leonard Cseres</div>
        <div className={styles.muted}>
          © Leonard Cseres {new Date().getFullYear()}. All rights reserved
        </div>
      </div>
    </footer>
  );
};
