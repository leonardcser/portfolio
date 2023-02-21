import Fade from "react-reveal/Fade";
import Image from "next/image";

import styles from "./Logos.module.scss";

interface ILogo {
  path: string;
  width: number;
  height: number;
  subtitle: string;
  text: string;
}

interface Props {
  logos: ILogo[];
}

export const Logos: React.FC<Props> = ({ logos }) => {
  return (
    <div className={styles.logos}>
      {logos.map((l, i) => (
        <Fade key={i} bottom distance="20px" delay={i * 200}>
          <div className={styles["item-container"]}>
            <Image
              src={`/images/${l.path}`}
              alt="logo"
              width={l.width}
              height={l.height}
              style={{ objectFit: "contain" }}
            />
            <h4 className={styles.subtitle}>{l.subtitle}</h4>
            <p>{l.text}</p>
          </div>
        </Fade>
      ))}
    </div>
  );
};
