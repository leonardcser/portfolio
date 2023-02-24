import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Cursor.module.scss";

export const Cursor: React.FC = () => {
  const cursor = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -50, y: -50 });
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCursor = useCallback(
    (cursorX: number, cursorY: number) => {
      if (!cursor.current) return;
      const diffX = mousePos.x - cursorX;
      const diffY = mousePos.y - cursorY;
      const newCursorPos = {
        x: cursorX + diffX / 10,
        y: cursorY + diffY / 10,
      };

      cursor.current.style.left = `${
        newCursorPos.x - cursor.current.offsetWidth / 2 + window.scrollX
      }px`;
      cursor.current.style.top = `${
        newCursorPos.y - cursor.current.offsetHeight / 2 + window.scrollY
      }px`;

      if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        requestAnimationFrame(() =>
          updateCursor(newCursorPos.x, newCursorPos.y)
        );
      } else {
        setIsAnimating(false);
      }
    },
    [mousePos.x, mousePos.y]
  );

  useEffect(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      requestAnimationFrame(() => updateCursor(mousePos.x, mousePos.y));
    }
  }, [isAnimating, mousePos.x, mousePos.y, updateCursor]);

  const updateMousePos = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = () => {
    cursor.current?.classList.add(styles.click);
  };
  const handleMouseUp = () => {
    cursor.current?.classList.remove(styles.click);
  };

  const handleMouseEnter = () => {
    cursor.current?.classList.add(styles.hover);
  };
  const handleMouseLeave = () => {
    cursor.current?.classList.remove(styles.hover);
  };

  useEffect(() => {
    const initHover = () => {
      const links = [
        ...document.querySelectorAll("a"),
        ...document.querySelectorAll("button"),
        ...document.querySelectorAll(".cursor"),
      ];
      links.forEach(link => {
        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const removeHover = () => {
      const links = [
        ...document.querySelectorAll("a"),
        ...document.querySelectorAll("button"),
        ...document.querySelectorAll(".cursor"),
      ];
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };

    document.addEventListener("mousemove", updateMousePos);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    initHover();
    return () => {
      document.removeEventListener("mousemove", updateMousePos);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      removeHover();
    };
  }, []);

  return <div ref={cursor} className={styles.cursor}></div>;
};
