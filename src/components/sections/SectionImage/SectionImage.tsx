import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@components/FadeIn/FadeIn";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";

import styles from "./SectionImage.module.scss";

interface IImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  children: React.ReactNode;
  image: IImageProps;
  order: 0 | 1;
  href?: string;
}

// TODO: Add sizes prop to Image component
export const SectionImage: React.FC<Props> = ({
  children,
  image,
  order,
  href,
}) => {
  const imgContainerRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [imgContainerHeight, setImgContainerHeight] = useState<number>();

  const updateImgContainerHeight = useCallback(() => {
    if (imgContainerRef.current) {
      const aspectRatio = image.width / image.height;
      const imgContainerWidth = imgContainerRef.current.clientWidth;
      setImgContainerHeight(imgContainerWidth / aspectRatio);
    }
  }, [imgContainerRef, image.width, image.height]);

  useEffect(() => {
    window.addEventListener("resize", updateImgContainerHeight);
    updateImgContainerHeight();
    return () => {
      window.removeEventListener("resize", updateImgContainerHeight);
    };
  }, [updateImgContainerHeight]);

  return (
    <ResponsiveSplitCols className={styles.content}>
      {href ? (
        <Link
          href={href}
          ref={imgContainerRef as React.RefObject<HTMLAnchorElement>}
          className={styles["image-container"]}
          style={{ height: imgContainerHeight }}
        >
          <Image fill src={image.src} alt={image.alt} />
        </Link>
      ) : (
        <div
          ref={imgContainerRef as React.RefObject<HTMLDivElement>}
          className={styles["image-container"]}
          style={{ height: imgContainerHeight }}
        >
          <Image fill src={image.src} alt={image.alt} />
        </div>
      )}
      <FadeIn style={{ flex: 1, order: order, display: "block" }}>
        {children}
      </FadeIn>
    </ResponsiveSplitCols>
  );
};
