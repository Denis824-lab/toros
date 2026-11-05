import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Particles from "../reactbits/Particles";
import { createPhotoRenderer } from "./photoRenderer";
import type { PhotoRenderer } from "./photoRenderer";
import "./living-photo.css";

const colors = ["#dceef9", "#ffffff", "#a9cde0"];
const motion = [
  { drift: 0.008, pointerX: 0.032, pointerY: 0.018 },
  { drift: 0.006, pointerX: 0.028, pointerY: 0.016 },
  { drift: 0.005, pointerX: 0.025, pointerY: 0.014 },
];
const preference = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden;
function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    query.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}

export default function LivingPhoto({ src, scene, active }: {
  src: string; scene: number; active: boolean;
}) {
  const image = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const disabled = useSyncExternalStore(subscribe, preference, () => true);
  const enabled = active && visible && !disabled;

  useEffect(() => {
    const parent = image.current?.parentElement;
    if (!parent) return;
    const observer = new IntersectionObserver(entries => {
      setVisible(entries.some(entry => entry.isIntersecting));
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const photo = image.current;
    const surface = canvas.current;
    if (!enabled || failed || !photo || !surface) return;
    const abort = new AbortController();
    let renderer: PhotoRenderer | null = null;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    const parent = photo.parentElement!;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = parent.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    };
    const leave = () => { pointerX = 0; pointerY = 0; };
    const loseContext = (event: Event) => {
      event.preventDefault();
      surface.classList.remove("is-ready");
      cancelAnimationFrame(frame);
      setFailed(true);
    };
    const render = (now: number) => {
      if (abort.signal.aborted) return;
      frame = requestAnimationFrame(render);
      // 30 fps is sufficient for a slow camera; skip GPU work between frames.
      if (now - previous < 1000 / 30) return;
      const delta = previous ? Math.min((now - previous) / 1000, 0.06) : 1 / 30;
      previous = now;
      time += delta;
      smoothX += (pointerX - smoothX) * (1 - Math.exp(-delta * 5));
      smoothY += (pointerY - smoothY) * (1 - Math.exp(-delta * 5));
      const settings = motion[scene];
      renderer?.draw(
        // Move the intact photograph in the cursor's direction.
        Math.sin(time * 0.35) * settings.drift - smoothX * settings.pointerX,
        Math.sin(time * 0.27) * settings.drift * 0.4 - smoothY * settings.pointerY,
        1 + (1 - Math.exp(-time * 3)) * 0.10 + (1 - Math.cos(time * 0.23)) * 0.008,
      );
      surface.classList.add("is-ready");
    };
    const resize = new ResizeObserver(() => renderer?.resize());
    resize.observe(parent);
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    surface.addEventListener("webglcontextlost", loseContext);
    void createPhotoRenderer(surface, photo, abort.signal)
      .then(result => {
        if (abort.signal.aborted) { result?.dispose(); return; }
        renderer = result;
        if (renderer) frame = requestAnimationFrame(render);
      }).catch(error => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        surface.classList.remove("is-ready");
        setFailed(true);
      });
    return () => {
      abort.abort();
      cancelAnimationFrame(frame);
      resize.disconnect();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      surface.removeEventListener("webglcontextlost", loseContext);
      surface.classList.remove("is-ready");
      renderer?.dispose();
    };
  }, [src, scene, enabled, failed]);

  return <>
    <img ref={image} className="hero-image" src={src} alt=""
      fetchPriority={scene === 0 ? "high" : "auto"} loading={scene === 0 ? "eager" : "lazy"} />
    {enabled && !failed && <canvas ref={canvas} className="hero-depth" aria-hidden="true" />}
    {enabled && <div className={`hero-ice hero-ice-${scene}`} aria-hidden="true">
      <Particles particleCount={scene === 0 ? 90 : 55} particleColors={colors}
        particleBaseSize={35} sizeRandomness={1.2} particleSpread={8}
        speed={0.12} cameraDistance={18} disableRotation pixelRatio={1}
        alphaParticles moveParticlesOnHover={false} />
    </div>}
  </>;
}
