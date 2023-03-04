import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { SkeletonLoader } from "@components/SkeletonLoader/SkeletonLoader";

export const SkeletonImage: React.FC<ImageProps> = props => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <SkeletonLoader />}
      <Image
        {...props}
        // the alt attribute is provided separately to avoid linting errors
        alt={props.alt}
        onLoadingComplete={() => setLoaded(true)}
      />
    </>
  );
};
