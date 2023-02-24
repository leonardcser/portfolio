import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Cursor } from "@components/Cursor/Cursor";
import GRADIENTS from "@lib/gradients";

interface Props {
  children: React.ReactNode;
  preContent?: React.ReactNode;
}

export const ErrorLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="main-container">
      <Cursor />
      <BackgroundLines absolute makeGradient={GRADIENTS.main} />
      <main>
        <div className="sections">{children}</div>
      </main>
    </div>
  );
};
