import dynamic from "next/dynamic";

export const DynamicCodeBlock = dynamic(() => import("./CodeBlock"), {
  loading: () => <div>Loading...</div>,
});
