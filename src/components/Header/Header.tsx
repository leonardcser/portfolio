import React from "react";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

import styles from "./Header.module.scss";

interface Props {
  children: React.ReactNode;
  // viewportHeight
  activeHeight?: string;
}

export const Header: React.FC<Props> = ({
  children,
  activeHeight = "100vh",
}) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const updateActive = () => {
      const height = parseInt(activeHeight.replace("vh", ""));
      if (window.pageYOffset > (window.innerHeight * height) / 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
    };
  }, [activeHeight]);

  // add onclick to children, with the children being the navlinks with typescript typings
  const newChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        onClick: () => setOpen(false),
      });
    }
    return child;
  });

  return (
    <header
      className={
        styles.header +
        (active ? ` ${styles.active}` : "") +
        (open ? ` ${styles.open}` : "")
      }
    >
      <button onClick={() => setOpen(prev => !prev)}>
        <IoMenu
          className={styles["menu-icon"] + (open ? ` ${styles.open}` : "")}
          size={30}
        />
      </button>
      <nav
        className={styles.container + (open ? ` ${styles.open}` : "")}
        onClick={() => setOpen(false)}
      >
        {newChildren}
      </nav>
    </header>
  );
};
