import MovieCard from './MovieCard';

export default function MovieGrid({ movies, title, sectionId }) {
    if (!movies || movies.length === 0) return null;

    return (
        <section className="px-6 md:px-16 py-8 relative" id={sectionId}>
            {title && (
                <div className="flex items-center justify-between mb-6 group/title">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#E50914] rounded-sm transform scale-y-75 group-hover/title:scale-y-100 transition-transform duration-300" />
                        <h2 className="text-xl md:text-3xl font-black text-white tracking-tight cursor-default">{title}</h2>
                    </div>

                    <button className="text-xs md:text-sm font-bold text-[#E50914] opacity-0 group-hover/title:opacity-100 transition-opacity duration-300 hover:underline">
                        Explore All →
                    </button>
                </div>
            )}

            {/* Expansive Grid with better gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 pb-10">
                {movies.map((movie, index) => (
                    <div key={movie.id} className="h-full">
                        <MovieCard movie={movie} index={index} />
                    </div>
                ))}
            </div>
        </section>
    );
}
