import { useRef, useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';

export default function FullscreenPlayer() {
    const { currentMovie, stopMovie, setMovieStatus } = useMovieStore();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        if (!currentMovie) return;

        // Premium behavior: hide scrollbar, prevent body scroll
        document.body.style.overflow = 'hidden';
        setMovieStatus(currentMovie.id, 'playing');

        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            setMovieStatus(currentMovie.id, 'idle');
        };
    }, [currentMovie]);

    if (!currentMovie) return null;

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        setProgress((currentTime / duration) * 100);
    };

    const seek = (e) => {
        const width = e.currentTarget.offsetWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = videoRef.current.duration;
        videoRef.current.currentTime = (clickX / width) * duration;
    };

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black animate-fade-in flex items-center justify-center">

            {/* Background Loader */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-black/50 backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white font-black text-xl tracking-widest animate-pulse uppercase">METFLIX</p>
                </div>
            )}

            {/* Main Video Element */}
            <video
                ref={videoRef}
                src={currentMovie.streamUrl}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onTimeUpdate={handleProgress}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onEnded={stopMovie}
                onClick={togglePlay}
            />

            {/* Top Controls: Back Button & Info */}
            <div className={`fixed top-0 left-0 right-0 p-6 md:p-10 flex items-center justify-between transition-opacity duration-700 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <button
                    onClick={stopMovie}
                    className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-110"
                    id="back-to-main"
                    title="Back to Netflix"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

                <div className="flex flex-col items-end opacity-40 select-none pointer-events-none">
                    <span className="text-[#E50914] font-black text-2xl tracking-tighter">METFLIX</span>
                    <span className="text-[9px] text-white tracking-[0.4em] font-black uppercase">Original Production</span>
                </div>
            </div>

            {/* Center Feedback (Play/Pause) - Optional visual boost */}
            {isPlaying === false && showControls && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-24 h-24 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 animate-fade-in">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white fill-white" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Bottom Controls: Progress & Actions */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 md:p-12 transition-all duration-500 player-controls z-20 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>

                {/* Progress Bar */}
                <div className="relative mb-8 group/progress">
                    <div
                        className="progress-bar-container w-full"
                        onClick={seek}
                    >
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>

                    {/* Time Indicators */}
                    <div className="absolute -top-6 left-0 right-0 flex justify-between text-[11px] font-bold text-gray-400 opacity-0 group-hover/progress:opacity-100 transition-opacity">
                        <span>{videoRef.current ? Math.floor(videoRef.current.currentTime / 60) + ':' + ('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2) : '0:00'}</span>
                        <span>{currentMovie.duration}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-10">
                        <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button onClick={() => videoRef.current.currentTime -= 10} className="text-white hover:text-gray-300 transition-colors hidden sm:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                            </svg>
                        </button>

                        <button onClick={() => videoRef.current.currentTime += 10} className="text-white hover:text-gray-300 transition-colors hidden sm:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3 md:gap-4 group/vol">
                            <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                                {isMuted || volume === 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setVolume(val);
                                    videoRef.current.volume = val;
                                    setIsMuted(val === 0);
                                }}
                                className="w-0 group-hover/vol:w-20 md:group-hover/vol:w-24 transition-all duration-300 accent-[#E50914] hidden md:block"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <h2 className="text-white font-black text-xl md:text-2xl tracking-tighter hidden md:block select-none">{currentMovie.name}</h2>
                        <button
                            onClick={() => videoRef.current.requestFullscreen()}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
