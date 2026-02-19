import { useRef, useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';

export default function MovieCard({ movie, index }) {
    const { hoveredMovieId, setHoveredMovie, playMovie } = useMovieStore();
    const videoRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const isHovered = hoveredMovieId === movie.id;
    const hoverTimeoutRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const timer = setTimeout(() => {
            if (!imageLoaded) setImageLoaded(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, [imageLoaded]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovered) {
            // For desktop, we keep the delay for better UX
            if (!isTouchDevice) {
                hoverTimeoutRef.current = setTimeout(() => {
                    video.currentTime = 0;
                    video.play().catch(() => { });
                }, 500);
            }
        } else {
            clearTimeout(hoverTimeoutRef.current);
            video.pause();
            video.currentTime = 0;
            setVideoReady(false);
        }

        return () => clearTimeout(hoverTimeoutRef.current);
    }, [isHovered, isTouchDevice]);

    const handleMouseEnter = () => !isTouchDevice && setHoveredMovie(movie.id);
    const handleMouseLeave = () => !isTouchDevice && setHoveredMovie(null);

    const handleTouchEnd = (e) => {
        if (isHovered) {
            // If already previewing, play the full movie
            playMovie(movie);
        } else {
            // First tap: Start preview immediately
            setHoveredMovie(movie.id);
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                // Mobile browsers allow .play() here because it's a direct user action
                videoRef.current.play()
                    .then(() => setVideoReady(true))
                    .catch((err) => console.warn("Mobile preview blocked:", err));
            }
        }
    };

    return (
        <div
            className="movie-card animate-fade-in group/card h-full"
            style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={!isTouchDevice ? () => playMovie(movie) : undefined}
            onTouchStart={(e) => isTouchDevice && e.stopPropagation()}
            onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
        >
            {/* Poster Image Layer */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a]">
                <img
                    src={movie.poster}
                    alt={movie.name}
                    className={`poster-img w-full h-full object-cover transition-all duration-700 ${isHovered && videoReady ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        setImageLoaded(true);
                        e.target.src = `https://via.placeholder.com/640x360/141414/e50914?text=${encodeURIComponent(movie.name)}`;
                    }}
                />

                {/* Preview Video Overlay */}
                <video
                    ref={videoRef}
                    src={movie.previewUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 scale-105 ${isHovered && videoReady ? 'opacity-100' : 'opacity-0'}`}
                    onCanPlay={() => setVideoReady(true)}
                />

                {/* Hover Controls Over Video */}
                {isHovered && (
                    <div className="absolute top-2 right-2 z-20 flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md rounded-full p-1.5 border border-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="loading-skeleton absolute inset-0 z-10" />
                )}
            </div>

            {/* Info Section - Premium Netflix Expanded Layout */}
            <div className={`p-3 md:p-4 bg-[#181818] transition-all duration-300 ${isHovered ? 'bg-[#181818] shadow-2xl relative z-20' : 'bg-transparent'}`}>

                {/* Quick Action Icons (Mock) - High visibility on hover */}
                <div className={`flex items-center justify-between mb-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 hidden md:flex'}`}>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-black fill-black" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#2a2a2a] border border-white/40 flex items-center justify-center hover:border-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#2a2a2a] border border-white/40 flex items-center justify-center hover:border-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Title & match info */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                    <h3 className={`text-sm md:text-base font-bold truncate transition-colors ${isHovered ? 'text-white' : 'text-gray-300'} tracking-wide`}>
                        {movie.name}
                    </h3>
                    {isHovered && <span className="text-green-500 text-[10px] md:text-xs font-black whitespace-nowrap bg-green-500/10 px-1.5 py-0.5 rounded">98% Match</span>}
                </div>

                {/* Bottom Metadata */}
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white text-[10px] md:text-xs px-1.5 py-0.5 border border-white/40 rounded-sm font-bold tracking-wider">HD</span>
                    <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-wide uppercase">{movie.duration}</span>
                    <span className="text-gray-600 text-[10px] md:text-xs font-black">•</span>
                    <span className="text-[#E50914] text-[10px] md:text-xs font-black uppercase tracking-widest">{movie.genre.split(',')[0]}</span>
                </div>

                {/* Full genres on hover */}
                {isHovered && (
                    <div className="mt-4 flex flex-wrap gap-2 animate-fade-in pt-3 border-t border-white/5">
                        {movie.genre.split(',').slice(1).map(g => (
                            <span key={g} className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{g.trim()}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* Touch Hint Overlay */}
            {isTouchDevice && !isHovered && (
                <div className="absolute top-2 left-2 z-[5] bg-black/40 backdrop-blur-sm rounded-full p-1 border border-white/20">
                    <div className={`status-dot ${movie.status === 'playing' ? 'playing' : 'idle'}`} />
                </div>
            )}
        </div>
    );
}
