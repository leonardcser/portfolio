import { useEffect, useRef } from "react";
import { SkeletonLoader } from "@components/SkeletonLoader/SkeletonLoader";

interface Props {
  src: string;
}

export const AutoPlayVideo: React.FC<Props> = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const autoPlay = async () => {
      if (ref.current && ref.current.readyState > 0) {
        try {
          await ref.current.play();
        } catch (err) {
          ref.current.controls = true;
        }
      }
    };
    autoPlay();
  }, []);

  return (
    <>
      <SkeletonLoader />
      <video ref={ref} autoPlay loop playsInline muted>
        <source src={src}></source>
      </video>
    </>
  );
};
