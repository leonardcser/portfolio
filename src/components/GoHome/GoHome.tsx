import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

import styles from "./GoHome.module.css";

export const GoHome = () => {
  return (
    <Link href="/" className={styles.container}>
      <FiChevronLeft size={30} />
      <span className={styles.link}>Home</span>
    </Link>
  );
};
