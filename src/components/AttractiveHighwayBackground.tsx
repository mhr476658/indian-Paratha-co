import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Trees, Flame, Compass, Moon } from 'lucide-react';
import { useTheme, ThemeId } from '../context/ThemeContext';

export type AtmosphereStyle =
  | 'botanical-conservatory'
  | 'royal-obsidian-gold'
  | 'midnight-chalet-sapphire'
  | 'saffron-crimson-hearth';

interface AtmosphereConfig {
  id: AtmosphereStyle;
  themeId: ThemeId;
  label: string;
  tagline: string;
  gradient: string;
  particleColors: string[];
  glowColor: string;
  resortImage: string;
  accentColor: string;
  ambientVibe: string;
}

const ATMOSPHERES: Record<AtmosphereStyle, AtmosphereConfig> = {
  'botanical-conservatory': {
    id: 'botanical-conservatory',
    themeId: 'espresso',
    label: 'Botanical Conservatory & Glasshouse',
    tagline: 'Lush greenhouse atrium, crittall iron frames, warm glowing amber orbs',
    gradient:
      'radial-gradient(ellipse at 50% 20%, #152219 0%, #0E1611 40%, #080D0A 80%, #040705 100%)',
    particleColors: ['#E5A93C', '#F2B84B', '#8EA893', '#CFE4D4', '#FFFFFF'],
    glowColor: 'rgba(229, 169, 60, 0.28)',
    resortImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&auto=format&fit=crop&q=85',
    accentColor: '#E5A93C',
    ambientVibe: 'from-[#E5A93C]/20 via-[#2E4434]/25 to-[#080D0A]',
  },
  'royal-obsidian-gold': {
    id: 'royal-obsidian-gold',
    themeId: 'espresso',
    label: 'Royal Obsidian & Imperial Gold',
    tagline: 'Deep velvet obsidian, champagne gold flares & cast-iron tawa radiance',
    gradient:
      'radial-gradient(ellipse at 50% 15%, #141926 0%, #0D111A 45%, #080A10 80%, #05060A 100%)',
    particleColors: ['#F3E5AB', '#E6CA85', '#D4AF37', '#FFE8A3', '#FFFFFF'],
    glowColor: 'rgba(230, 202, 133, 0.22)',
    resortImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&auto=format&fit=crop&q=85',
    accentColor: '#E6CA85',
    ambientVibe: 'from-[#E6CA85]/20 via-[#C9184A]/15 to-[#080A10]',
  },
  'midnight-chalet-sapphire': {
    id: 'midnight-chalet-sapphire',
    themeId: 'chalet',
    label: 'Midnight Sapphire & Chalet Pine',
    tagline: 'Deep mountain night sky, cool pine breeze & warm tawa amber',
    gradient:
      'radial-gradient(circle at 50% 20%, #171D2B 0%, #0F1420 45%, #090D15 80%, #04060A 100%)',
    particleColors: ['#90E0EF', '#00B4D8', '#E6CA85', '#CAF0F8', '#FFFFFF'],
    glowColor: 'rgba(144, 224, 239, 0.20)',
    resortImage:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=2400&auto=format&fit=crop&q=85',
    accentColor: '#90E0EF',
    ambientVibe: 'from-cyan-500/15 via-blue-950/30 to-[#090D15]',
  },
  'saffron-crimson-hearth': {
    id: 'saffron-crimson-hearth',
    themeId: 'caramel',
    label: 'Saffron Crimson & Glowing Hearth',
    tagline: 'Rich tandoori crimson, saffron embers & simmering masala chai',
    gradient:
      'radial-gradient(circle at 50% 25%, #251016 0%, #15090F 45%, #0A0508 80%, #050204 100%)',
    particleColors: ['#FF758F', '#C9184A', '#FFB703', '#FB8500', '#FFFFFF'],
    glowColor: 'rgba(201, 24, 74, 0.22)',
    resortImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=2400&auto=format&fit=crop&q=85',
    accentColor: '#C9184A',
    ambientVibe: 'from-rose-600/18 via-red-950/25 to-[#0A0508]',
  },
};

export const AttractiveHighwayBackground: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [atmosphere, setAtmosphere] = useState<AtmosphereStyle>('botanical-conservatory');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
  const animIdRef = useRef<number | null>(null);

  const activeConfig = ATMOSPHERES[atmosphere] || ATMOSPHERES['botanical-conservatory'];

  // Interactive mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D Canvas Particle Dust Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(width > 768 ? 45 : 22, 60);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15),
      alpha: Math.random() * 0.5 + 0.2,
      maxAlpha: Math.random() * 0.6 + 0.3,
      alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color:
        activeConfig.particleColors[
          Math.floor(Math.random() * activeConfig.particleColors.length)
        ],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle mouse spotlight
      const grad = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        Math.max(width, height) * 0.45
      );
      grad.addColorStop(0, activeConfig.glowColor);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw floating embers / spores
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha >= p.maxAlpha || p.alpha <= 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Ember halo
        if (p.size > 1.4) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [atmosphere]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-all duration-1000">
      {/* 1. Deep Atmospheric Gradient Background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: activeConfig.gradient }}
      />

      {/* 2. Greenhouse / Conservatory Crittall Window Grid & Tile Geometry Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 3. Floating Ambient Sunburst & Amber Halo Orbs */}
      <div
        className="absolute top-[-10%] right-[10%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-40 transition-all duration-1000 animate-pulse-glow"
        style={{ background: activeConfig.glowColor }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full blur-[180px] opacity-30 transition-all duration-1000"
        style={{ background: 'rgba(46, 68, 52, 0.35)' }}
      />

      {/* 4. Interactive 3D Dust / Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 5. Vignette Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-transparent to-[#080D0A]/70 pointer-events-none" />
    </div>
  );
};
