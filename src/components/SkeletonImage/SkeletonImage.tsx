import { useState } from "react";
import Image, { ImageProps } from "next/image";

import styles from "./SkeletonImage.module.scss";

export const SkeletonImage: React.FC<ImageProps> = props => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className={styles.skeleton} />}
      <Image
        {...props}
        // the alt attribute is provided separately to avoid linting errors
        alt={props.alt}
        onLoadingComplete={() => setLoaded(true)}
      />
    </>
  );
};
