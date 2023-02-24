import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FadeIn: React.FC<Props> = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      <Reveal
        keyframes={customAnimation}
        cascade
        damping={0.1}
        triggerOnce
        style={{ opacity: 0 }}
      >
        {children}
      </Reveal>
    </div>
  );
};
