"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Search, SlidersHorizontal, ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 30 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
};

interface Match {
    id: string;
    matchPercentage: number;
    make: string;
    model: string;
    valuation: number;
    mileage: string;
    specs: string;
    imageUrl: string;
}

function DiscoverContent() {
    const searchParams = useSearchParams();
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const make = searchParams.get("make") || "Toyota";
                const model = searchParams.get("model") || "Camry";
                const year = searchParams.get("year");
                const mileage = searchParams.get("mileage");
                const condition = searchParams.get("condition");

                const response = await fetch("/api/match", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ make, model, year, mileage, condition }),
                });

                const data = await response.json();
                if (data.success && data.matches) {
                    setMatches(data.matches);
                } else {
                    setError(data.error || "Failed to find matches");
                }
            } catch {
                setError("An error occurred while fetching matches");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [searchParams]);

    return (
        <main className="pt-32 pb-40 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
            >
                <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-2 text-on-surface-variant font-label text-[10px] uppercase tracking-[0.3em]">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_var(--color-secondary)]"></div>
                        Neural Engine Active v4.2
                    </div>
                    <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
                        Curated<br /><span className="text-on-surface-variant/20 italic">Selection</span>
                    </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="h-12 px-6 rounded-full border border-outline font-label uppercase tracking-widest text-[10px] hover:bg-surface-container transition-all flex items-center gap-2 group">
                        <SlidersHorizontal size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                        Filters
                    </button>
                    <button className="h-12 px-6 rounded-full bg-primary text-on-primary font-label uppercase tracking-widest text-[10px] hover:opacity-90 transition-all flex items-center gap-2 shadow-2xl shadow-primary/20">
                        <Search size={14} />
                        New Search
                    </button>
                </div>
            </motion.div>

            {/* Grid Layout */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={loading ? "hidden" : "show"}
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
                {loading ? (
                    <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="w-16 h-16 border-[1.5px] border-outline-variant rounded-full"></div>
                            <div className="absolute inset-0 w-16 h-16 border-[1.5px] border-secondary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-headline text-lg font-bold tracking-tight uppercase">Analyzing Inventory</p>
                            <p className="font-label uppercase tracking-widest text-on-surface/40 text-[10px]">Cross-referencing marketplace data...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-20 px-8 rounded-3xl bg-secondary/20 border border-secondary/30 text-center font-label uppercase tracking-widest text-on-surface-variant text-xs">
                        <div className="mb-4 text-2xl">⚡</div>
                        {error}
                    </div>
                ) : matches.length === 0 ? (
                    <div className="col-span-full py-32 text-center border-2 border-dashed border-outline-variant rounded-3xl">
                        <p className="font-label uppercase tracking-widest text-on-surface/40 text-xs">Zero results found for current query.</p>
                        <button className="mt-8 text-secondary font-headline uppercase font-bold tracking-tighter text-sm underline underline-offset-8 decoration-2">Broadcast Search to Agents</button>
                    </div>
                ) : (
                    matches.map((match, index) => {
                        const isFeatured = index === 0;
                        const gridClass = isFeatured
                            ? "md:col-span-12 lg:col-span-8 h-[600px]"
                            : "md:col-span-6 lg:col-span-4 h-[600px] lg:h-[600px]";

                        return (
                            <motion.div
                                variants={itemVariants}
                                key={match.id}
                                className={`${gridClass} group relative overflow-hidden bg-surface border border-outline-variant/30 hover:border-secondary transition-colors duration-500`}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt={`${match.make} ${match.model}`}
                                        src={match.imageUrl}
                                        fill
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>

                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-sm border border-white/10 text-white font-headline text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                                            <Sparkles size={10} className="text-secondary" />
                                            {match.matchPercentage}% AI Match
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-black transition-all">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-10">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-headline text-3xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-none mb-2 group-hover:tracking-normal transition-all duration-500">
                                                {match.make}<br />{match.model}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 font-label text-[10px] text-white/60 uppercase tracking-[0.2em]">
                                                <span>{match.specs}</span>
                                                <span className="w-1 h-1 bg-secondary rounded-full self-center"></span>
                                                <span>{match.mileage}</span>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="font-label text-[8px] text-white/40 uppercase tracking-[0.3em]">Estimated Value</p>
                                                <p className="font-headline text-3xl text-secondary font-black tracking-tighter">${match.valuation.toLocaleString()}</p>
                                            </div>
                                            <Link href="/success" className="h-14 px-8 rounded-full bg-secondary text-primary font-headline uppercase tracking-tighter font-black text-sm hover:translate-x-2 transition-transform">
                                                Swap Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </motion.div>

            {/* Infinite Scroll Indicator */}
            {!loading && matches.length > 0 && (
                <div className="mt-32 flex flex-col items-center gap-10">
                    <div className="relative h-24 w-px bg-outline-variant overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 96] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-96px] w-full h-full bg-secondary shadow-[0_0_15px_var(--color-secondary)]"
                        />
                    </div>
                    <button className="group flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform">
                        <span className="font-label uppercase tracking-[0.5em] text-[10px] text-on-surface-variant font-bold group-hover:text-secondary">Load Infinite Grid</span>
                        <ChevronDown size={24} className="text-secondary animate-bounce" />
                    </button>
                </div>
            )}
        </main>
    );
}

export default function Discover() {
    return (
        <div className="bg-background text-on-background relative min-h-screen selection:bg-secondary selection:text-black">
            <TopNavBar />

            <Suspense fallback={
                <div className="min-h-screen pt-32 pb-40 flex items-center justify-center">
                    <div className="w-12 h-12 border border-outline-variant border-t-secondary rounded-full animate-spin"></div>
                </div>
            }>
                <DiscoverContent />
            </Suspense>

            <BottomNavBar />
        </div>
    );
}

