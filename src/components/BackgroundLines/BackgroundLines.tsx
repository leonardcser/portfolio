import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./BackgroundLines.module.css";

interface Props {
  color?: string;
  makeGradient?: (gradient: CanvasGradient) => CanvasGradient;
  // in pixels
  height?: number | string;
  absolute?: boolean;
  style?: React.CSSProperties;
}
interface IPoint {
  x: number;
  y: number;
}

export const BackgroundLines: React.FC<Props> = ({
  color,
  makeGradient,
  height = "100vh",
  absolute = false,
  style,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [interpMousePos, setInterpMousePos] = useState<IPoint>({
    x: 0,
    y: 0,
  });
  const [targetMousePos, setTargetMousePos] = useState<IPoint>({
    x: 0,
    y: 0,
  });
  const [scrollTS, setScrollTS] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const curv = -0.1;
  const radius = 600;
  const maxWaveHeight = 250;
  const extraStartCurves = 2;
  const spacing = 42;

  const randAngle1 = 1;
  const randAngle2 = 1;
  const randX1 = 1;
  const randX2 = 1;

  const dist = (pt1: IPoint, pt2: IPoint) => {
    return (pt2.x - pt1.x) ** 2 + (pt2.y - pt1.y) ** 2;
  };

  const interpolate = (p: IPoint, pt: IPoint, easing: number) => {
    const { x: interpX, y: interpY } = p;
    const { x: targetX, y: targetY } = pt;
    const newInterpX = interpX + (targetX - interpX) * easing;
    const newInterpY = interpY + (targetY - interpY) * easing;
    return { x: newInterpX, y: newInterpY };
  };

  const shouldUpdate = useCallback(() => {
    const canvasBR = ref.current?.getBoundingClientRect();
    return (
      canvasBR && window.innerHeight - canvasBR.top >= 0 && canvasBR.bottom >= 0
    );
  }, [ref]);

  const initCanvas = useCallback(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 4;
    if (makeGradient !== undefined) {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        ref.current.width,
        ref.current.height
      );
      ctx.strokeStyle = makeGradient(gradient);
    } else {
      ctx.strokeStyle = color ? color : "rgba(255, 255, 255, 0.3)";
    }
  }, [color, makeGradient]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  useEffect(() => {
    const updateCanvas = () => {
      let dpi = window.devicePixelRatio;
      if (ref.current) {
        let heightPx = window.innerHeight;
        if (typeof height === "string") {
          heightPx =
            (parseInt(height.replace("vh", "")) * window.innerHeight) / 100;
        } else if (typeof height === "number") {
          heightPx = height;
        }

        ref.current.setAttribute("height", String(heightPx * dpi));
        ref.current.setAttribute("width", String(window.innerWidth * dpi));
        initCanvas();
      }
    };

    window.addEventListener("resize", updateCanvas);
    updateCanvas();
    return () => {
      window.removeEventListener("resize", updateCanvas);
    };
  }, [height, initCanvas]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvasBR = ref.current?.getBoundingClientRect();
      const offset = window.pageYOffset + (canvasBR ? canvasBR.top : 0);
      setTargetMousePos({
        x: event.clientX,
        y: event.clientY - offset,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateScroll = (e: Event) => {
      setScrollTS(e.timeStamp);
    };
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    setOpacity(1);
    setTargetMousePos({ x: window.innerWidth / 3, y: window.innerHeight / 2 });
  }, []);

  useEffect(() => {
    const updateInterpMousePos = () => {
      setInterpMousePos(interpolate(interpMousePos, targetMousePos, 0.2));
    };

    if (shouldUpdate() && dist(interpMousePos, targetMousePos) >= 10) {
      requestAnimationFrame(updateInterpMousePos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    interpMousePos.x,
    interpMousePos.y,
    targetMousePos.x,
    targetMousePos.y,
    scrollTS,
    shouldUpdate,
  ]);

  useEffect(() => {
    if (ref.current && shouldUpdate()) {
      const nbrCurves = Math.round(ref.current.height / spacing) + 1;

      const totPoints: IPoint[][] = new Array(extraStartCurves + nbrCurves);
      for (let i = -extraStartCurves; i < nbrCurves; i++) {
        let mouseX =
          (interpMousePos.x + window.pageXOffset) * window.devicePixelRatio;
        let mouseY =
          (interpMousePos.y + window.pageYOffset) * window.devicePixelRatio;
        let y = spacing * i;
        let diffY = Math.abs(y - mouseY);
        let curvature = Math.min(maxWaveHeight, 10000 / diffY) * curv * 10;

        totPoints[i + extraStartCurves] = [
          { x: 0, y },
          {
            x: mouseX - radius + 1 / randX1,
            y: y + 1 / randAngle1,
          },
          { x: mouseX, y: y - curvature },
          {
            x: mouseX + radius - 1 / randX2,
            y: y + 1 / randAngle2,
          },
          { x: ref.current.width, y },
        ];
      }

      const ctx = ref.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        for (const points of totPoints) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 2; i++) {
            var xc = (points[i].x + points[i + 1].x) / 2;
            var yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          // p4 -> p5
          ctx.quadraticCurveTo(
            points[points.length - 2].x,
            points[points.length - 2].y,
            points[points.length - 1].x,
            points[points.length - 1].y
          );
          ctx.stroke();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interpMousePos.x, interpMousePos.y, scrollTS, shouldUpdate]);

  const htmlHeight = height
    ? typeof height === "number"
      ? `${height}px`
      : `${height}`
    : "100vh";

  const canvasElement = (
    <canvas
      ref={ref}
      className={styles.canvas}
      style={{
        opacity: opacity,
        height: htmlHeight,
        ...style,
      }}
    />
  );

  return absolute ? (
    canvasElement
  ) : (
    <div style={{ height: htmlHeight }}>{canvasElement}</div>
  );
};
