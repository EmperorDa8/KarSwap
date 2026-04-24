import Link from 'next/link';
import { X, CheckCircle2 } from 'lucide-react';

export default function SuccessConfirmation() {
    return (
        <>
            {/* TopAppBar Shell */}
            <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-background/60 backdrop-blur-xl bg-gradient-to-b from-background to-transparent shadow-none">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <X className="text-primary cursor-pointer hover:opacity-70 active:scale-95 transition-all" size={24} />
                    </Link>
                </div>
                <h1 className="font-headline uppercase tracking-widest font-black text-2xl text-primary">KARSWAP</h1>
                <div className="w-6"></div> {/* Spacer for centering */}
            </header>

            <main className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 overflow-hidden">
                {/* Background Atmospheric Element */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Subtle gradient instead of radical radial-gradient for Tailwind v4 compatibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low to-background"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                </div>

                {/* Success Content Container */}
                <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center mt-12">
                    {/* Animated Checkmark Portal */}
                    <div className="mb-12 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"></div>
                        <div className="relative w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center bg-surface-container-low/40 backdrop-blur-md">
                            <CheckCircle2 className="text-primary" size={64} strokeWidth={1} />
                        </div>
                    </div>

                    {/* Headline Section */}
                    <div className="space-y-4 mb-10">
                        <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter text-on-surface uppercase leading-none">
                            SWAP <br /> INITIATED
                        </h2>
                        <div className="h-1 w-12 bg-primary mx-auto opacity-50"></div>
                    </div>

                    {/* Glass Card Content */}
                    <div className="w-full bg-surface-container-low/60 backdrop-blur-xl rounded-lg p-8 mb-12 shadow-[0_0_48px_rgba(229,226,225,0.06)]">
                        <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-light">
                            Your request is being processed. Our AI is finalizing the details to ensure your vehicle swap meets the highest engineering standards.
                        </p>

                        {/* Status Stepper Subtle Representation */}
                        <div className="mt-8 flex justify-between items-center px-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-primary">REQUEST</span>
                            </div>
                            <div className="h-[1px] flex-1 bg-outline-variant/30 mx-2"></div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-primary">ANALYSIS</span>
                            </div>
                            <div className="h-[1px] flex-1 bg-outline-variant/15 mx-2"></div>
                            <div className="flex flex-col items-center gap-2 opacity-30">
                                <div className="w-2 h-2 rounded-full bg-on-surface"></div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface">MATCH</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Cluster */}
                    <div className="w-full space-y-4">
                        <Link href="/" className="block w-full">
                            <button className="w-full py-5 rounded-full bg-primary text-on-primary font-label text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95">
                                RETURN TO DASHBOARD
                            </button>
                        </Link>
                        <Link href="/discover" className="block w-full">
                            <button className="w-full py-5 rounded-full border border-primary/20 text-primary font-label text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary/5 hover:border-primary/40 active:scale-95">
                                VIEW MATCHES
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Vehicle Silhouette (Subtle) */}
                <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none overflow-hidden h-64" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAR_vt3qGzUrntkjdY9VTJi2FRORpuVAzrhsvsZw7euNuH48_o70aetYxcjFa5zE721XRyDKTudCntFy2NoPYkB6ANDZCa4k77rcBJjiP54Lz5oFY2NuNwXN-exypEr26DnHGBCYAjty-LmqTmpPEQT4zgDBuL9MOS7eReje5lBOrd64H_7ps9rqvLxA2-3TDTsmAXHtcZ_yoZrJgDbIYQJcaJIcCsS6l6G-ZYSLzsvD4dxGrUbeoWD5T-sdTLejqOmIL6x7bVe4IaD')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)', mixBlendMode: 'screen' }}>
                </div>
            </main>
        </>
    );
}
