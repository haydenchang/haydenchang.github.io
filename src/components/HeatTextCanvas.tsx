import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type MaskMeta = {
  widthCss: number;
  heightCss: number;
  widthPx: number;
  heightPx: number;
  dpr: number;
};

const WHITE: Rgb = { r: 237, g: 237, b: 237 };
const YELLOW: Rgb = { r: 238, g: 214, b: 128 };
const RED: Rgb = { r: 220, g: 82, b: 66 };
const FAR_DIST = 110;
const HOT_DIST = 78;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t))
  };
}

type HeatTextCanvasProps = {
  text: string;
  className?: string;
};

export default function HeatTextCanvas({ text, className }: HeatTextCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const maskRef = useRef<Uint8ClampedArray | null>(null);
  const metaRef = useRef<MaskMeta | null>(null);

  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const hasPointerRef = useRef(false);
  const pointerRef = useRef<Point>({ x: 0, y: 0 });
  const pointerTargetRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.imageSmoothingEnabled = true;
    context.shadowBlur = 0;

    const getOffscreenContext = () => {
      if (!offscreenRef.current) {
        offscreenRef.current = document.createElement("canvas");
      }
      const offscreen = offscreenRef.current;
      return offscreen.getContext("2d", { willReadFrequently: true });
    };

    const drawStaticWhite = () => {
      const meta = metaRef.current;
      const mask = maskRef.current;
      if (!meta || !mask) {
        return;
      }

      const imageData = context.createImageData(meta.widthPx, meta.heightPx);
      const data = imageData.data;
      for (let i = 0; i < mask.length; i += 4) {
        const alpha = mask[i + 3];
        if (!alpha) {
          continue;
        }
        data[i] = WHITE.r;
        data[i + 1] = WHITE.g;
        data[i + 2] = WHITE.b;
        data[i + 3] = alpha;
      }
      context.putImageData(imageData, 0, 0);
    };

    const buildMask = () => {
      const offscreenContext = getOffscreenContext();
      if (!offscreenContext) {
        return;
      }

      const styles = window.getComputedStyle(container);
      const fontSize = parseFloat(styles.fontSize || "64");
      const fontWeight = styles.fontWeight || "500";
      const fontFamily = styles.fontFamily || "sans-serif";
      const letterSpacing = parseFloat(styles.letterSpacing || "0");
      const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

      offscreenContext.font = font;
      const metrics = offscreenContext.measureText(text);
      const textWidth = metrics.width + Math.max(0, letterSpacing) * Math.max(0, text.length - 1);
      const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.8;
      const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2;
      const widthCss = Math.max(1, Math.ceil(textWidth + 4));
      const heightCss = Math.max(1, Math.ceil(ascent + descent + 4));
      const dpr = window.devicePixelRatio || 1;
      const widthPx = Math.max(1, Math.floor(widthCss * dpr));
      const heightPx = Math.max(1, Math.floor(heightCss * dpr));

      container.style.width = `${widthCss}px`;
      container.style.height = `${heightCss}px`;
      canvas.style.width = `${widthCss}px`;
      canvas.style.height = `${heightCss}px`;
      canvas.width = widthPx;
      canvas.height = heightPx;

      if (!offscreenRef.current) {
        return;
      }
      offscreenRef.current.width = widthPx;
      offscreenRef.current.height = heightPx;

      offscreenContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      offscreenContext.clearRect(0, 0, widthCss, heightCss);
      offscreenContext.font = font;
      offscreenContext.fillStyle = "#ffffff";
      offscreenContext.textBaseline = "alphabetic";
      offscreenContext.fillText(text, 2, 2 + ascent);

      maskRef.current = offscreenContext.getImageData(0, 0, widthPx, heightPx).data;
      metaRef.current = { widthCss, heightCss, widthPx, heightPx, dpr };

      context.setTransform(1, 0, 0, 1, 0, 0);
      if (reduceMotionRef.current || !hasPointerRef.current) {
        drawStaticWhite();
      }
    };

    const renderHeatFrame = (pointer: Point | null) => {
      const meta = metaRef.current;
      const mask = maskRef.current;
      if (!meta || !mask) {
        return;
      }

      const imageData = context.createImageData(meta.widthPx, meta.heightPx);
      const data = imageData.data;

      const farPx = FAR_DIST * meta.dpr;
      const hotPx = HOT_DIST * meta.dpr;
      const hotRange = Math.max(1, hotPx);
      const warmRange = Math.max(1, farPx - hotPx);

      for (let i = 0; i < mask.length; i += 4) {
        const maskAlpha = mask[i + 3];
        if (!maskAlpha) {
          continue;
        }

        let color = WHITE;
        if (pointer) {
          const pixel = i / 4;
          const x = pixel % meta.widthPx;
          const y = Math.floor(pixel / meta.widthPx);
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < farPx) {
            if (dist > hotPx) {
              const t = clamp((farPx - dist) / warmRange, 0, 1);
              color = mixColor(WHITE, YELLOW, t);
            } else {
              const t = clamp((hotPx - dist) / hotRange, 0, 1);
              const redBias = Math.pow(t, 0.62);
              color = mixColor(YELLOW, RED, redBias);
            }
          }
        }

        data[i] = color.r;
        data[i + 1] = color.g;
        data[i + 2] = color.b;
        data[i + 3] = maskAlpha;
      }

      context.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      if (reduceMotionRef.current) {
        isAnimatingRef.current = false;
        rafRef.current = null;
        drawStaticWhite();
        return;
      }

      if (!hasPointerRef.current) {
        isAnimatingRef.current = false;
        rafRef.current = null;
        renderHeatFrame(null);
        return;
      }

      pointerRef.current = {
        x: lerp(pointerRef.current.x, pointerTargetRef.current.x, 0.2),
        y: lerp(pointerRef.current.y, pointerTargetRef.current.y, 0.2)
      };

      renderHeatFrame(pointerRef.current);

      const delta = Math.hypot(
        pointerTargetRef.current.x - pointerRef.current.x,
        pointerTargetRef.current.y - pointerRef.current.y
      );
      if (delta < 0.6) {
        isAnimatingRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const queueAnimation = () => {
      if (isAnimatingRef.current || reduceMotionRef.current) {
        return;
      }
      isAnimatingRef.current = true;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const updatePointerTarget = (event: PointerEvent) => {
      const meta = metaRef.current;
      if (!meta) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      pointerTargetRef.current = {
        x: (event.clientX - rect.left) * meta.dpr,
        y: (event.clientY - rect.top) * meta.dpr
      };

      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        pointerRef.current = { ...pointerTargetRef.current };
      }

      queueAnimation();
    };

    const handlePointerLeave = () => {
      hasPointerRef.current = false;
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isAnimatingRef.current = false;
      renderHeatFrame(null);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      reduceMotionRef.current = mediaQuery.matches;
      if (reduceMotionRef.current) {
        handlePointerLeave();
      } else {
        renderHeatFrame(hasPointerRef.current ? pointerRef.current : null);
      }
    };

    buildMask();
    handleMotionPreference();
    renderHeatFrame(null);

    const handleResize = () => {
      buildMask();
      renderHeatFrame(hasPointerRef.current ? pointerRef.current : null);
    };

    const fontSet = "fonts" in document ? document.fonts : null;
    if (fontSet) {
      void fontSet.ready.then(() => {
        buildMask();
        renderHeatFrame(hasPointerRef.current ? pointerRef.current : null);
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", updatePointerTarget, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", updatePointerTarget);
      window.removeEventListener("pointerleave", handlePointerLeave);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [text]);

  const resolvedClassName = className ? `heat-text-canvas ${className}` : "heat-text-canvas";

  return (
    <div ref={containerRef} className={resolvedClassName} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
