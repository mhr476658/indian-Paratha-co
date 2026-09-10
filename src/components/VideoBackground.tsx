import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Video, Sparkles, Volume2, VolumeX } from 'lucide-react';

export interface VideoSourceOption {
  id: string;
  name: string;
  tagline: string;
  videoUrl: string;
  fallbackImage: string;
}

export const VIDEO_SOURCES: VideoSourceOption[] = [
  {
    id: 'sizzling-tawa-craft',
    name: 'Cast-Iron Hearth & Sizzling Tawa',
    tagline: 'Whole-wheat parathas griddled with pure desi ghee',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-indian-food-in-a-pan-43094-large.mp4',
    fallbackImage: '/hero-new-bg.jpg',
  },
  {
    id: 'highway-chalet-ambience',
    name: 'Rustic Chalet & Highway Sanctuary',
    tagline: 'Warm wooden chalet lights along NH7 Devanahalli',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-dish-with-herbs-43092-large.mp4',
    fallbackImage: '/hero-bg.jpg',
  },
  {
    id: 'kulhad-chai-steam',
    name: 'Aromatic Kulhad Chai & Spices',
    tagline: 'Simmering ginger-cardamom tea in earthen pots',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-steam-rising-from-a-hot-pan-41551-large.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=2400&auto=format&fit=crop&q=85',
  },
];

interface VideoBackgroundProps {
  className?: string;
  opacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  className = '',
  opacity = 0.38,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoSourceOption>(VIDEO_SOURCES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [selectedVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Video playback error:', e));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Background Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster={selectedVideo.fallbackImage}
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.24] contrast-[1.28] saturate-[1.15] transition-opacity duration-1000"
        style={{ opacity: hasError ? 0 : opacity }}
      >
        <source src={selectedVideo.videoUrl} type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback Static Image if Video Cannot Play */}
      <div
        className={`absolute inset-0 bg-cover bg-center filter brightness-[0.24] contrast-[1.28] saturate-[1.15] transition-opacity duration-1000 ${
          hasError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${selectedVideo.fallbackImage})` }}
      />

      {/* Deep Obsidian Gradients (#080D0A) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/50 to-[#080D0A]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080D0A]/90 via-transparent to-[#080D0A]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080D0A]/50 to-[#080D0A]" />

      {/* Subtle Warm Amber & Botanical Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[400px] bg-[#2E4434]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Interactive Floating Video Mood Controls in Bottom Corner */}
      <div className="fixed bottom-24 lg:bottom-6 left-4 z-40 pointer-events-auto flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2.5 rounded-full bg-[#121620]/90 hover:bg-[#1A202E] text-[#E6CA85] border border-[#E6CA85]/35 shadow-2xl backdrop-blur-xl transition-all active:scale-90 flex items-center gap-2 text-xs font-mono font-bold cursor-pointer hover:border-[#E6CA85]"
            aria-label="Toggle video background controls"
            title="Cinematic Video Background Settings"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
              {isPlaying ? 'Video Ambience' : 'Paused'}
            </span>
          </button>

          {/* Expanded Video Menu Popup */}
          {showControls && (
            <div className="absolute bottom-12 left-0 w-72 bg-[#121620] border border-[#E6CA85]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl text-white space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6CA85] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Cinematic Background
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Video Atmosphere Options */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Select Atmosphere:
                </span>
                {VIDEO_SOURCES.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => {
                      setSelectedVideo(source);
                      setHasError(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col cursor-pointer ${
                      selectedVideo.id === source.id
                        ? 'bg-[#E6CA85]/20 border border-[#E6CA85] text-white shadow-md'
                        : 'bg-black/40 hover:bg-white/5 text-slate-300 border border-white/5'
                    }`}
                  >
                    <span className="font-bold text-[11px] font-serif text-[#F8F9FA]">{source.name}</span>
                    <span className="text-[9px] text-slate-400 truncate">{source.tagline}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
