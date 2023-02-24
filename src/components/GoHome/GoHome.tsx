import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./GoHome.module.css";

interface Props {
  back?: boolean;
}

export const GoHome: React.FC<Props> = ({ back = true }) => {
  const router = useRouter();
  const inner = (
    <>
      <FiChevronLeft size={30} />
      <span className={styles.link}>Home</span>
    </>
  );
  return back ? (
    <button className={styles.container} onClick={() => router.back()}>
      {inner}
    </button>
  ) : (
    <Link href="/" className={styles.container}>
      {inner}
    </Link>
  );
};
