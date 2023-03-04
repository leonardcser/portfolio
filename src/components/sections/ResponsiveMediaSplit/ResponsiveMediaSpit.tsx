import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@components/FadeIn/FadeIn";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";

import styles from "./ResponsiveMediaSplit.module.scss";

interface Props {
  children: React.ReactNode;
  media: React.ReactNode;
  mediaWidth: number;
  mediaHeight: number;
  order: 0 | 1;
  wrap?: boolean;
  href?: string;
}

export const ResponsiveMediaSplit: React.FC<Props> = ({
  children,
  media,
  mediaWidth,
  mediaHeight,
  order,
  wrap = true,
  href,
}) => {
  const imgContainerRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [imgContainerHeight, setImgContainerHeight] = useState<number>();

  const updateImgContainerHeight = useCallback(() => {
    if (imgContainerRef.current) {
      const aspectRatio = mediaWidth / mediaHeight;
      const imgContainerWidth = imgContainerRef.current.clientWidth;
      setImgContainerHeight(imgContainerWidth / aspectRatio);
    }
  }, [imgContainerRef, mediaWidth, mediaHeight]);

  useEffect(() => {
    window.addEventListener("resize", updateImgContainerHeight);
    updateImgContainerHeight();
    return () => {
      window.removeEventListener("resize", updateImgContainerHeight);
    };
  }, [updateImgContainerHeight]);

  const mediaContainerStyle: CSSProperties = {
    height: imgContainerHeight,
    flexBasis: wrap ? undefined : "100%",
  };

  return (
    <ResponsiveSplitCols className={styles.content}>
      {href ? (
        <Link
          href={href}
          ref={imgContainerRef as React.RefObject<HTMLAnchorElement>}
          className={styles["media-container"]}
          style={mediaContainerStyle}
        >
          {media}
        </Link>
      ) : (
        <div
          ref={imgContainerRef as React.RefObject<HTMLDivElement>}
          className={styles["media-container"]}
          style={mediaContainerStyle}
        >
          {media}
        </div>
      )}
      <FadeIn style={{ flex: 1, order: order, display: "block" }}>
        {children}
      </FadeIn>
    </ResponsiveSplitCols>
  );
};
