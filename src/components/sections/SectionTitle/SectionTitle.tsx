import React from "react";
import Link from "next/link";
import { FadeIn } from "@components/FadeIn/FadeIn";
import { Tag } from "@components/Tag/Tag";

import styles from "./SectionTitle.module.scss";

interface Props {
  title: string;
  subtitle: string;
  tags?: string[];
  extraTags?: React.ReactNode[];
  fade?: boolean;
  href?: string;
  hrefNewTab?: boolean;
}

export const SectionTitle: React.FC<Props> = ({
  title,
  subtitle,
  tags,
  extraTags,
  fade,
  href,
  hrefNewTab,
}) => {
  const component = (
    <div className={styles.container}>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      {href ? (
        <Link href={href} target={hrefNewTab ? "_blank" : "_self"}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
      ) : (
        <h3 className={styles.title}>{title}</h3>
      )}

      {tags !== undefined && (
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
          {extraTags?.map((extraTag, i) => (
            <React.Fragment key={i}>{extraTag}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
  return fade ? <FadeIn>{component}</FadeIn> : component;
};
