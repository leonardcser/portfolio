import dynamic from "next/dynamic";

// TODO: Add a loading component
export const DynamicCodeBlock = dynamic(() => import("./CodeBlock"), {
  loading: () => <div>Loading...</div>,
});
