import { useState } from "react";
import Image from "next/image";

import styles from "./SkeletonImage.module.scss";

interface Props {
  src: string;
  alt: string;
}

export const SkeletonImage: React.FC<Props> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className={styles.skeleton} />}
      <Image
        fill
        src={src}
        alt={alt}
        onLoadingComplete={() => setLoaded(true)}
      />
    </>
  );
};
