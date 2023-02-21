import styles from "./SectionMainTitle.module.scss";

interface Props {
  title: string;
}

export const SectionMainTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles["title-container"]}>
      <div className={styles.line}></div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
};
