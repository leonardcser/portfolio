import styles from "./ResponsiveSplitCols.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ResponsiveSplitCols: React.FC<Props> = ({
  children,
  className,
  style = {},
}) => {
  return (
    <div
      className={styles.container + (className ? ` ${className}` : "")}
      style={style}
    >
      {children}
    </div>
  );
};
