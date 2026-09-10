import React, { useRef, useState, useCallback } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number; // max tilt degrees (default: 10)
  scale?: number;   // hover scale (default: 1.02)
  glare?: boolean;  // show specular light sheen (default: true)
  glareOpacity?: number; // max glare opacity (default: 0.18)
  perspective?: number;  // perspective in px (default: 1000)
  onClick?: () => void;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  id,
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.18,
  perspective = 1000,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Normalized coordinates from -0.5 (top/left) to +0.5 (bottom/right)
      const normX = (e.clientX - rect.left) / width - 0.5;
      const normY = (e.clientY - rect.top) / height - 0.5;

      // Tilt angles: moving mouse up (negative normY) tilts top away (positive rotateX)
      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      setTilt({ x: rotX, y: rotY });

      if (glare) {
        setGlarePos({
          x: ((e.clientX - rect.left) / width) * 100,
          y: ((e.clientY - rect.top) / height) * 100,
          opacity: glareOpacity,
        });
      }
    },
    [maxTilt, glare, glareOpacity]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      }}
    >
      {children}

      {/* Specular Glare / Light Reflection Overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 215, 0, 0.15) 30%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
};
