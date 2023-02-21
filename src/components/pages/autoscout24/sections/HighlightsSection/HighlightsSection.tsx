import { DynamicCodeBlock } from "@components/CodeBlock";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import {
  AUTOSCOUT24_EXAMPLE,
  AUTOSCOUT24_SEARCH_QUERY,
  AUTOSCOUT24_VALIDATOR,
} from "@lib/codeSnippets";

import styles from "./HighlightsSection.module.scss";

export const HighlightsSection: React.FC = () => {
  return (
    <section id="highlights">
      <SectionMainTitle title="Development" />
      <SectionTitle
        title="Highlights"
        subtitle="Python, Selenium, and Beautiful Soup"
        fade
      />
      <p>
        The AutoScout24 API wrapper was built using Python, Selenium, and
        Beautiful Soup. These tools were used to extract data from the
        AutoScout24 website, validate user function parameters, and encode
        Python class options into HTTPS requests. The project also used headless
        support with connection retries and included custom exceptions to handle
        errors.
      </p>
      <DynamicCodeBlock
        {...AUTOSCOUT24_EXAMPLE}
        compact
        style={{ marginBottom: "1rem" }}
      />
      <ResponsiveSplitCols className={styles["flex-container"]}>
        <DynamicCodeBlock {...AUTOSCOUT24_SEARCH_QUERY} compact />
        <DynamicCodeBlock {...AUTOSCOUT24_VALIDATOR} compact />
      </ResponsiveSplitCols>
    </section>
  );
};
