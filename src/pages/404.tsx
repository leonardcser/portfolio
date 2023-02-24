import { ErrorTitleSection } from "@components/ErrorTitleSection/ErrorTitleSection";
import { ErrorLayout } from "@components/layouts/ErrorLayout/ErrorLayout";

export default function NotFound() {
  return (
    <ErrorLayout>
      <ErrorTitleSection title="Oops, we can't find that page." code={404} />
    </ErrorLayout>
  );
}
