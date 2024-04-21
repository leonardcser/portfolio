import Image from "next/image";

import styles from "./Award.module.css";

interface Props {
  children: React.ReactNode;
  yOffset?: number;
}

export const Award: React.FC<Props> = ({ children, yOffset }) => {
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
      <h5
        className={styles["award-text"]}
        style={{
          transform: `translateY(${yOffset ?? 0}px)`,
        }}
      >
        {children}
      </h5>
    </div>
  );
};
