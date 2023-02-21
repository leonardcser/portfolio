import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";

import styles from "./BackToTop.module.scss";

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const updateShow = () => {
      if (window.pageYOffset > window.innerHeight) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", updateShow);
    return () => {
      window.removeEventListener("scroll", updateShow);
    };
  }, []);

  return (
    <button
      className={styles.container + (show ? ` ${styles.show}` : "")}
      onClick={() => animateScroll.scrollToTop()}
    >
      <FaChevronUp size={20} />
    </button>
  );
};
