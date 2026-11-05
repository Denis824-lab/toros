import type { HTMLAttributes, ReactNode } from "react";
import TargetCursor from "../reactbits/TargetCursor";
import Magnet from "../reactbits/Magnet";
import AnimatedContent from "../reactbits/AnimatedContent";
import SplitText from "../reactbits/SplitText";
import TiltedCard from "../reactbits/TiltedCard";
import { DirectionAwareHover } from "../aceternity/direction-aware-hover";
import { useMotionAllowed, usePointerMotion } from "./preferences";
import "./motion.css";

export function SiteCursor() {
  const allowed = usePointerMotion();
  return allowed ? (
    <TargetCursor
      targetSelector="a[href]:not([aria-disabled='true']), button:not(:disabled):not([aria-disabled='true']), [role='button']:not([aria-disabled='true']), [role='tab']:not([aria-disabled='true']):not([data-disabled]), [role='radio']:not([aria-disabled='true']):not([data-disabled])"
      cursorColor="#009b38"
      cursorColorOnTarget="#00bd53"
      blendMode="normal"
      spinDuration={0}
      size={22}
      cornerSize={7}
      thickness={1.5}
      padding={5}
      dotSize={3}
      showLabel={false}
      parallaxOn={false}
      hoverDuration={0.25}
      hideDefaultCursor={false}
    />
  ) : null;
}

export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const allowed = usePointerMotion();
  if (!allowed)
    return (
      <div
        className={`motion-magnet ${className}`}
        style={{ position: "relative", display: "inline-block" }}
      >
        <div className="motion-magnet-inner">{children}</div>
      </div>
    );
  return (
    <Magnet
      disabled={!allowed}
      padding={18}
      magnetStrength={6}
      maxOffset={5}
      tilt={0}
      scale={1}
      wrapperClassName={`motion-magnet ${className}`}
      innerClassName="motion-magnet-inner"
    >
      {children}
    </Magnet>
  );
}

export function Reveal({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const allowed = useMotionAllowed();
  return allowed ? (
    <AnimatedContent
      distance={22}
      duration={0.65}
      ease="power3.out"
      threshold={0.08}
      once
      initialOpacity={0}
      style={{ visibility: "visible" }}
      {...props}
    >
      {children}
    </AnimatedContent>
  ) : (
    <div {...props}>{children}</div>
  );
}

export function MotionHeading({
  lines,
  as = "h2",
  active = true,
  ...props
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  active?: boolean;
} & HTMLAttributes<HTMLHeadingElement>) {
  const allowed = useMotionAllowed();
  const Tag = as;
  return (
    <Tag aria-label={lines.join(" ")} {...props}>
      {lines.map((line, index) => (
        <span className="motion-title-line" aria-hidden="true" key={line}>
          {allowed && active ? (
            <SplitText
              text={line}
              tag="span"
              textAlign="left"
              splitType="words"
              effect="rise"
              duration={0.55}
              delay={65 + index * 20}
              rootMargin="0px"
              threshold={0.05}
              mask={false}
              loop={false}
            />
          ) : (
            line
          )}
        </span>
      ))}
    </Tag>
  );
}

export function NewsPhoto({
  src,
  alt,
  featured,
}: {
  src: string;
  alt: string;
  featured: boolean;
}) {
  const allowed = usePointerMotion();
  if (!allowed)
    return (
      <div className="news-image">
        <img src={src} alt={alt} loading="lazy" width="800" height="533" />
      </div>
    );
  if (featured)
    return (
      <TiltedCard
        imageSrc={src}
        altText={alt}
        className="news-image motion-news-tilt"
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={3}
        scaleOnHover={1.018}
        radius={6}
        showTooltip={false}
        shadow={0}
        glare={0}
        parallax={0}
        intro={false}
        gyroscope={false}
        floating={false}
      />
    );
  return (
    <DirectionAwareHover
      imageUrl={src}
      altText={alt}
      className="news-image direction-news-image"
      imageClassName="direction-news-photo"
      childrenClassName="direction-news-caption"
    >
      <span>
        Читать <span aria-hidden="true">↗</span>
      </span>
    </DirectionAwareHover>
  );
}
