import React from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavLink.module.scss";

interface Props {
  name: string;
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<Props> = ({ name, to, href, icon, onClick }) => {
  const router = useRouter();

  return href ? (
    href === "/" ? (
      <button className={styles.navlink} onClick={() => router.back()}>
        {icon}
        <div
          className={
            styles.name + (router.asPath === href ? ` ${styles.active}` : "")
          }
        >
          {name}
        </div>
      </button>
    ) : (
      <Link href={href} className={styles.navlink}>
        {icon}
        <div
          className={
            styles.name + (router.asPath === href ? ` ${styles.active}` : "")
          }
        >
          {name}
        </div>
      </Link>
    )
  ) : (
    <div className={styles.navlink}>
      {icon}
      <ScrollLink
        className={styles.name}
        activeClass={styles.active}
        to={to !== undefined ? to : ""}
        spy={true}
        smooth={true}
        offset={-60}
        duration={1000}
        onTransitionEnd={onClick}
      >
        {name}
      </ScrollLink>
    </div>
  );
};
