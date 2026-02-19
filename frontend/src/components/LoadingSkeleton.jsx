export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[#141414] overflow-hidden">
            {/* Navbar skeleton */}
            <div className="fixed top-0 left-0 right-0 z-40 px-6 md:px-16 py-6 flex items-center justify-between">
                <div className="loading-skeleton w-32 md:w-48 h-8 rounded-sm opacity-50" />
                <div className="flex gap-6">
                    <div className="loading-skeleton w-8 h-8 rounded-full opacity-30" />
                    <div className="loading-skeleton w-8 h-8 rounded-md opacity-30" />
                </div>
            </div>

            {/* Hero skeleton */}
            <div className="relative h-screen w-full">
                <div className="loading-skeleton w-full h-full rounded-none opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                <div className="absolute bottom-32 left-6 md:left-16 space-y-6 max-w-2xl">
                    <div className="loading-skeleton w-3/4 h-16 rounded-md opacity-40" />
                    <div className="loading-skeleton w-1/2 h-6 rounded-md opacity-30" />
                    <div className="flex gap-4">
                        <div className="loading-skeleton w-32 h-12 rounded-lg opacity-40" />
                        <div className="loading-skeleton w-32 h-12 rounded-lg opacity-20" />
                    </div>
                </div>
            </div>

            {/* Grid skeleton */}
            <div className="px-6 md:px-16 py-12 -mt-20 relative z-10">
                <div className="loading-skeleton w-48 h-8 rounded-sm mb-8 opacity-40" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="loading-skeleton aspect-video rounded-lg opacity-30" />
                            <div className="flex items-center justify-between">
                                <div className="loading-skeleton w-1/2 h-5 rounded opacity-20" />
                                <div className="loading-skeleton w-12 h-5 rounded opacity-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] text-gray-500 font-black tracking-[0.4em] uppercase">Loading Experience</span>
            </div>
        </div>
    );
}
