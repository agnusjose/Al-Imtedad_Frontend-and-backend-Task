import { create } from 'zustand';
import { fetchMovies, startPlayback, stopPlayback } from '../api/movieApi';

const useMovieStore = create((set, get) => ({
    // State
    movies: [],
    loading: true,
    error: null,
    currentMovie: null, // Rename from selectedMovie for clarity
    isFullscreen: false,
    hoveredMovieId: null,

    // Actions
    loadMovies: async () => {
        set({ loading: true, error: null });
        try {
            const result = await fetchMovies();
            set({ movies: result.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
            console.error('Failed to load movies:', error);
        }
    },

    setHoveredMovie: (movieId) => {
        set({ hoveredMovieId: movieId });
    },

    setMovieStatus: (movieId, status) => {
        set((state) => ({
            movies: state.movies.map((m) =>
                m.id === movieId ? { ...m, status } : m
            ),
        }));
    },

    playMovie: async (movie) => {
        try {
            // Optimistic status update
            get().setMovieStatus(movie.id, 'playing');
            await startPlayback(movie.id);
            set({ currentMovie: movie, isFullscreen: true });
        } catch (error) {
            console.error('Failed to start playback:', error);
            // Still play locally even if API fails
            set({ currentMovie: movie, isFullscreen: true });
        }
    },

    stopMovie: async () => {
        const { currentMovie } = get();
        if (currentMovie) {
            try {
                get().setMovieStatus(currentMovie.id, 'idle');
                await stopPlayback(currentMovie.id);
            } catch (error) {
                console.error('Failed to stop playback:', error);
            }
        }
        set({ currentMovie: null, isFullscreen: false });
    },

    // Refresh movie statuses from server
    refreshMovies: async () => {
        try {
            const result = await fetchMovies();
            set({ movies: result.data });
        } catch (error) {
            console.error('Failed to refresh movies:', error);
        }
    },
}));

export default useMovieStore;
