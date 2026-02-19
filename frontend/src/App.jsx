import { useEffect } from 'react';
import useMovieStore from './store/useMovieStore';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MovieGrid from './components/MovieGrid';
import FullscreenPlayer from './components/FullscreenPlayer';
import LoadingSkeleton from './components/LoadingSkeleton';
import Footer from './components/Footer';

export default function App() {
  const { movies, loading, error, isFullscreen, loadMovies } = useMovieStore();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base">{error}</p>
          <button
            onClick={loadMovies}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Fullscreen Player (overlays everything when active) */}
      {isFullscreen && <FullscreenPlayer />}

      {/* Main Page Content */}
      <div className={isFullscreen ? 'hidden' : ''}>
        <Navbar />

        <div id="hero-section">
          <HeroSection />
        </div>

        {/* Movie Grids */}
        <div className="-mt-16 relative z-10">
          <MovieGrid
            movies={movies.slice(0, 3)}
            title="🔥 Trending Now"
            sectionId="section-trending"
          />

          <MovieGrid
            movies={movies.slice(3, 6)}
            title="🎬 Popular on NetStream"
            sectionId="section-popular"
          />

          <MovieGrid
            movies={movies.slice(6, 9)}
            title="⭐ Top Rated"
            sectionId="section-top-rated"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
