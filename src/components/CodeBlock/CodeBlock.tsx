import React, { useState } from "react";
import { FaPython } from "react-icons/fa";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
import dynamic from "next/dynamic";

import styles from "./CodeBlock.module.scss";

export interface Props {
  language: "python";
  filename: string;
  code: string;
  compact?: boolean;
  maximize?: boolean;
  style?: React.CSSProperties;
}

type LanguageIcons = {
  [key in Props["language"]]: React.FC;
};

const languageIcons: LanguageIcons = {
  python: FaPython,
};

const CodeBlock: React.FC<Props> = ({
  language,
  filename,
  code,
  compact = false,
  maximize = true,
  style = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    setIsFocused(prev => !prev);
    if (isFocused) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <div
      className={
        styles["block-container"] +
        (isFocused ? ` ${styles.focused}` : "") +
        (compact ? ` cursor ${styles.compact}` : "")
      }
      onClick={!isFocused && compact && maximize ? toggleFocus : undefined}
      style={{
        cursor: !isFocused && compact && maximize ? "pointer" : "auto",
        ...(!isFocused ? style : {}),
      }}
    >
      <div className={styles.bar}>
        <div className={styles["filename-container"]}>
          {React.createElement(languageIcons[language], {
            className: styles.icon,
          } as React.Attributes)}
          <span>{filename}</span>
        </div>
        {maximize && (
          <button onMouseDown={toggleFocus}>
            {isFocused ? <FiMinimize size={15} /> : <FiMaximize size={15} />}
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={nord}
        showLineNumbers
        // lineNumberStyle={{
        //   userSelect: "none",
        //   WebkitUserSelect: "none",
        //   MozUserSelect: "none",
        //   WebkitTouchCallout: "none",
        // }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
