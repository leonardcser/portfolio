import Fade from "react-reveal/Fade";
import Link from "next/link";
import { DynamicCodeBlock } from "@components/CodeBlock";
import { Props as CodeBlockProps } from "@components/CodeBlock/CodeBlock";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";

import styles from "./SectionCodeBlock.module.scss";

interface Props {
  children: React.ReactNode;
  codeBlockProps: CodeBlockProps;
  order?: 0 | 1;
  href?: string;
}

export const SectionCodeBlock: React.FC<Props> = ({
  children,
  codeBlockProps,
  order = 0,
  href,
}) => {
  const codeBlockContainer = (
    <div className={styles["code-block-container"]}>
      <DynamicCodeBlock {...codeBlockProps} maximize={href === undefined} />
    </div>
  );
  return (
    <ResponsiveSplitCols>
      {href ? (
        <Link
          href={href}
          className={styles["code-block-container"]}
          style={{ width: "100%" }}
        >
          {codeBlockContainer}
        </Link>
      ) : (
        codeBlockContainer
      )}
      <Fade cascade bottom distance="20px">
        <div style={{ flex: 1, order: order }}>{children}</div>
      </Fade>
    </ResponsiveSplitCols>
  );
};
