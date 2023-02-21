import Image from "next/image";

import styles from "./Award.module.css";

interface Props {
  children: React.ReactNode;
}

export const Award: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles["award-container"]}>
      <div className={styles["award-leaves"]}>
        <Image
          src="/leaves_right.svg"
          alt="leaves right"
          style={{
            transform: "scale(-1, 1)",
            marginRight: "-6px",
          }}
          width={75}
          height={75}
        />
        <Image
          src="/leaves_right.svg"
          alt="leaves right"
          style={{
            marginLeft: "-6px",
          }}
          width={75}
          height={75}
        />
      </div>
      <h5 className={styles["award-text"]}>{children}</h5>
    </div>
  );
};
