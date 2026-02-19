import { useState, useEffect, useRef } from 'react';
import useMovieStore from '../store/useMovieStore';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { movies, playMovie } = useMovieStore();
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchVisible]);

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Trending', id: 'section-trending' },
        { name: 'Popular', id: 'section-popular' },
        { name: 'Top Rated', id: 'section-top-rated' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 px-4 md:px-12 py-3 md:py-4 ${isScrolled ? 'bg-[#0b0b0b] shadow-2xl' : 'bg-gradient-to-b from-black/90 to-transparent'
            }`}>
            <div className="max-w-[1920px] mx-auto flex items-center justify-between">

                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-4 md:gap-12">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-1 hover:bg-white/10 rounded-full transition-all active:scale-90"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Premium Logo */}
                    <div
                        className="flex items-center gap-1 cursor-pointer group active:scale-95 transition-transform"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <span className="text-3xl md:text-3xl font-black text-[#E50914] tracking-tight transform group-hover:scale-105 transition-transform duration-300">METFLIX</span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-[14px] font-semibold text-gray-300 hover:text-white transition-all duration-200 active:scale-95 tracking-wide"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Right: Search & Profile */}
                <div className="flex items-center gap-3 md:gap-6">

                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        <div className={`flex items-center transition-all duration-500 transition-transform-layout ${isSearchVisible ? 'w-48 md:w-80 bg-black/60 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-xl' : 'w-10 overflow-hidden'
                            }`}>
                            <button
                                onClick={() => setIsSearchVisible(!isSearchVisible)}
                                className="text-white hover:text-gray-300 transition-colors shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Titles, genres..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`ml-2 bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-500 transition-opacity duration-300 ${isSearchVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onBlur={() => !searchQuery && setIsSearchVisible(false)}
                            />

                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Search Results Dropdown */}
                        {isSearchVisible && searchQuery && (
                            <div className="absolute top-12 right-0 w-64 md:w-80 glass-panel p-2 rounded-xl shadow-2xl animate-fade-in border border-white/10">
                                {filteredMovies.length > 0 ? (
                                    filteredMovies.map(movie => (
                                        <div
                                            key={movie.id}
                                            onClick={() => {
                                                playMovie(movie);
                                                setSearchQuery('');
                                                setIsSearchVisible(false);
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group"
                                        >
                                            <img src={movie.poster} alt={movie.name} className="w-12 h-16 object-cover rounded-md" />
                                            <div>
                                                <p className="text-white text-sm font-semibold truncate group-hover:text-[#E50914] transition-colors">{movie.name}</p>
                                                <p className="text-gray-400 text-xs">{movie.year} • {movie.genre.split(',')[0]}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm p-3 text-center">No results found</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="hidden sm:flex items-center gap-4">
                        <button className="text-white hover:text-gray-300 relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[#E50914] rounded-full border-2 border-black"></span>
                        </button>
                        <div className="w-8 h-8 rounded-md overflow-hidden border border-white/20 hover:border-white/50 cursor-pointer transition-colors">
                            <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-v09646y57v769062.jpg" alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="absolute top-0 left-0 w-3/4 h-full bg-[#141414] shadow-2xl animate-slide-in-left p-6">
                        <div className="flex items-center justify-between mb-10">
                            <span className="text-3xl font-black text-[#E50914]">METFLIX</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-2xl">×</button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-xl font-bold text-gray-300 hover:text-white text-left"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/10 flex items-center gap-4">
                            <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-v09646y57v769062.jpg" alt="Profile" className="w-12 h-12 rounded-lg" />
                            <div>
                                <p className="text-white font-bold">User Name</p>
                                <p className="text-gray-500 text-sm">Manage Profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
