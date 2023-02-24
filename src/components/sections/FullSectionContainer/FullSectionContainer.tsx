import styles from "./FullSectionContainer.module.css";

interface Props {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
  style?: React.CSSProperties;
  height?: number | string;
}

export const FullSectionContainer: React.FC<Props> = ({
  children,
  sectionId,
  className,
  style,
  height = "100vh",
}) => {
  return (
    <section
      id={sectionId}
      className={
        styles["section-container"] + (className ? ` ${className}` : "")
      }
      style={{ ...style, height }}
    >
      {children}
    </section>
  );
};
