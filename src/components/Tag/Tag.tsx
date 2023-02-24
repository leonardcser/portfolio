import styles from "./Tag.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Tag: React.FC<Props> = ({ children }) => {
  return <div className={styles.tag}>{children}</div>;
};
