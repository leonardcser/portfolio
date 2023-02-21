const GRADIENTS = {
  main: (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(255, 255, 255, 0)");
    g.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
    g.addColorStop(1, "rgba(255, 255, 255, 0)");
    return g;
  },
  scrapeout: (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(97, 134, 255, 0)");
    g.addColorStop(0.25, "rgb(97, 134, 255)");
    g.addColorStop(0.5, "rgb(166, 97, 255)");
    g.addColorStop(0.75, "rgb(97, 134, 255)");
    g.addColorStop(1, "rgba(97, 134, 255, 0.2)");
    return g;
  },
  captcha: (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(255, 136, 0, 0)");
    g.addColorStop(0.5, "rgb(255, 136, 0)");
    g.addColorStop(1, "rgba(255, 136, 0, 0)");
    return g;
  },
  autoscout24: (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(255, 136, 0, 0)");
    g.addColorStop(0.5, "rgb(243, 240, 0)");
    g.addColorStop(1, "rgba(255, 136, 0, 0)");
    return g;
  },
  pacman: (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(232, 60, 36, 0)");
    g.addColorStop(0.25, "rgb(232, 60, 36)");
    g.addColorStop(0.5, "rgb(3, 50, 215)");
    g.addColorStop(0.75, "rgb(232, 60, 36)");
    g.addColorStop(1, "rgba(232, 60, 36, 0)");
    return g;
  },
};

export default GRADIENTS;
