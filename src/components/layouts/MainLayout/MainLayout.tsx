import { BackToTop } from "@components/BackToTop/BackToTop";
import { Cursor } from "@components/Cursor/Cursor";
import { Footer } from "@components/Footer/Footer";

interface Props {
  children: React.ReactNode;
  preContent?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children, preContent }) => {
  return (
    <div className="main-container">
      <BackToTop />
      <Cursor />
      {preContent}
      <main>
        <div className="sections">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
