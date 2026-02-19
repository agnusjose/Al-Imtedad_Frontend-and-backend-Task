export default function Footer() {
    return (
        <footer className="px-6 md:px-16 py-16 mt-20 border-t border-white/5 bg-[#141414]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="max-w-xs transition-opacity hover:opacity-100 opacity-80">
                        <h2 className="text-2xl font-black text-[#E50914] mb-4 tracking-tighter">METFLIX</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            A high-performance streaming prototype built for excellence. Experience cinematic quality on any device.
                        </p>
                    </div>

                    {/* Links grid */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                            ['FAQ', 'Help Center', 'Account', 'Media Center'],
                            ['Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'],
                            ['Ways to Watch', 'Corporate Info', 'Contact Us', 'Speed Test'],
                            ['Legal Notices', 'Ad Choices', 'Cookie Settings', 'Gift Cards'],
                        ].map((column, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                {column.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="text-gray-500 text-xs md:text-sm hover:text-[#E50914] transition-colors font-medium"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-gray-600 text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                        Developed with React 19 • Tailwind 4 • Node.js • SQLite
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-[10px] uppercase font-bold">Source:</span>
                            <a
                                href="https://peach.blender.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 text-[10px] hover:text-white transition-colors underline"
                            >
                                Open Movie Project
                            </a>
                        </div>
                        <div className="px-3 py-1 border border-white/10 rounded text-[10px] text-gray-500 font-bold">
                            EN / US
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-700 text-[10px] mt-12 select-none">
                    © 2026 METFLIX PROTOTYPE. FOR DEMONSTRATION PURPOSES ONLY.
                </p>
            </div>
        </footer>
    );
}
