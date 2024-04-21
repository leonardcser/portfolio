import { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

import styles from "./ExternalLinkTag.module.css";

interface Props {
  title: string;
  href: string;
  Icon?: IconType;
}

export const ExternalLinkTag: React.FC<Props> = ({ title, href, Icon }) => {
  return (
    <Link href={href} target="_blank" className={styles.link}>
      {Icon && <Icon size={20} className={styles.icon} />}
      {title}
      <FiArrowUpRight size={20} className={styles.arrowIcon} />
    </Link>
  );
};
