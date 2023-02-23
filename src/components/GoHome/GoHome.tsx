import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";

import styles from "./GoHome.module.css";

export const GoHome = () => {
  const router = useRouter();
  return (
    <button className={styles.container} onClick={() => router.back()}>
      <FiChevronLeft size={30} />
      <span className={styles.link}>Home</span>
    </button>
  );
};
