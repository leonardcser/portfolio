import { ErrorTitleSection } from "@components/ErrorTitleSection/ErrorTitleSection";
import { ErrorLayout } from "@components/layouts/ErrorLayout/ErrorLayout";

export default function NotFound() {
  return (
    <ErrorLayout>
      <ErrorTitleSection title="Oops, something went wrong." code={500} />
    </ErrorLayout>
  );
}
