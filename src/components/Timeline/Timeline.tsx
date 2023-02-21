import Image from "next/image";

import styles from "./Timeline.module.scss";

interface IItem {
  imagePath: string;
  title: string;
  description: string;
  date: string;
}

interface Props {
  items: IItem[];
}

export const Timeline: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item, i) => (
        <div key={i} className={styles["item-container"]}>
          <div className={styles["image-container"]}>
            <Image fill src={item.imagePath} alt={item.title} />
          </div>
          <div className={styles["content-container"]}>
            <div className={styles.dot}></div>
            <div className={styles.item}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>{item.date}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
