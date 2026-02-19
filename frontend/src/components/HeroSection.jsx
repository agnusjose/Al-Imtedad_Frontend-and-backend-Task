import { useState, useRef, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';

export default function HeroSection() {
    const { movies, playMovie } = useMovieStore();
    const [isHovered, setIsHovered] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null);
    const featured = movies[0]; // First movie as featured

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                // Short delay for better UX on touch vs mouse
                const delay = 'ontouchstart' in window ? 100 : 800;
                const timer = setTimeout(() => {
                    videoRef.current.play().catch(() => { });
                    setVideoReady(true); // Fallback for mobile
                }, delay);
                return () => clearTimeout(timer);
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setVideoReady(false);
            }
        }
    }, [isHovered]);

    if (!featured) return null;

    return (
        <div
            className="relative h-[85dvh] md:h-screen w-full flex items-center overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if ('ontouchstart' in window) setIsHovered(!isHovered);
            }}
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src={featured.backdrop}
                    alt={featured.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${isHovered && videoReady ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100'}`}
                />

                {/* Background Video Preview */}
                <video
                    ref={videoRef}
                    src={featured.previewUrl}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isHovered && videoReady ? 'opacity-100' : 'opacity-0'}`}
                    onCanPlay={() => setVideoReady(true)}
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 hero-overlay z-[1]" />
                <div className="absolute inset-0 premium-gradient z-[1]" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#141414] to-transparent z-[2]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full px-6 md:px-16 pt-24 pb-12">
                <div className="max-w-4xl animate-fade-in">

                    {/* Billboard Badge */}
                    <div className="flex items-center gap-3 mb-6 scale-90 md:scale-100 origin-left select-none">
                        <div className="bg-[#E50914] text-white font-black px-2.5 py-1 rounded-sm text-xs md:text-sm shadow-xl tracking-tight">METFLIX</div>
                        <div className="text-white/90 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Featured Selection</div>
                    </div>

                    {/* Title with Shadow */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tight text-white"
                        style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.8))' }}
                    >
                        {featured.name}
                    </h1>

                    {/* Metadata */}
                    <div className="flex items-center gap-6 mb-8 text-sm md:text-base font-bold text-gray-100">
                        <span className="text-green-500 font-extrabold">98% Match</span>
                        <span className="text-white/70">{featured.year}</span>
                        <span className="border border-white/40 px-2 py-0.5 rounded text-[10px] md:text-xs tracking-wider uppercase font-black bg-white/5">Ultra HD 4K</span>
                        <span className="text-white/70">{featured.duration}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 text-base md:text-xl mb-10 line-clamp-3 max-w-2xl font-medium leading-relaxed"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                        {featured.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-5 md:gap-7">
                        <button
                            onClick={() => playMovie(featured)}
                            className="flex items-center justify-center gap-3 px-8 md:px-14 py-3.5 md:py-4.5 rounded-lg font-black text-black bg-white hover:bg-white/90 transition-all duration-300 transform md:hover:scale-105 active:scale-95 text-lg shadow-2xl group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-black group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play
                        </button>

                        <button
                            onClick={() => {
                                const el = document.getElementById('section-trending');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className="flex items-center justify-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 md:hover:scale-105 active:scale-95 text-lg border border-white/10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            More Info
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Rating/Mute Controls (Visual only for polish) */}
            <div className="absolute right-0 bottom-[20%] z-10 flex items-center gap-4 py-2 pl-4 pr-16 bg-white/5 backdrop-blur-sm border-l-2 border-white/40 hidden md:flex">
                <span className="text-white font-bold opacity-80 uppercase tracking-tighter text-sm">Rating: {featured.rating}</span>
            </div>
        </div>
    );
}
