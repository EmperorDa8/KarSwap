"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Heart, X, Info, Sparkles, Receipt, Droplets, Gauge } from "lucide-react";

interface Match {
    id: string;
    matchPercentage: number;
    make: string;
    model: string;
    valuation: number;
    currencySymbol: string;
    source: string;
    imageUrl: string;
    specs: {
        fuel?: string;
        transmission?: string;
        power?: string;
        drive?: string;
        condition?: string;
        mileage?: string;
    };
    aiVerification?: {
        score: number;
        status: string;
        report: string;
    };
}

function MatchContent() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Swiping logic
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const skipOpacity = useTransform(x, [-150, -50], [1, 0]);
    const matchOpacity = useTransform(x, [50, 150], [0, 1]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/match", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ make: "Luxury", model: "SUV" }),
                });

                const data = await response.json();
                if (data.success && data.matches) {
                    setMatches(data.matches);
                } else {
                    setError(data.error || "Failed to find matches");
                }
            } catch {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleSwipe = (direction: "left" | "right") => {
        if (direction === "right") {
            console.log("Matched with", matches[currentIndex].make);
        }
        setCurrentIndex((prev) => prev + 1);
        x.set(0);
    };

    const currentCard = matches[currentIndex];

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-8">
                    <div className="w-24 h-24 border-[3px] border-outline-variant rounded-full"></div>
                    <div className="absolute inset-0 w-24 h-24 border-[3px] border-secondary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase tracking-tighter mb-2">Syncing with Marketplace</h3>
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">Gathering high-fidelity vehicle data...</p>
            </div>
        );
    }

    if (error || matches.length === 0 || currentIndex >= matches.length) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-12 text-center max-w-xl mx-auto">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-8">
                    <Sparkles className="text-secondary" size={32} />
                </div>
                <h3 className="font-headline text-4xl font-bold uppercase tracking-tighter mb-4">Discovery Cycle Complete</h3>
                <p className="font-body text-on-surface-variant mb-12">
                    We've exhausted the current local inventory matching your profile.
                    Expand your search radius or update your preferences to continue.
                </p>
                <div className="flex flex-col w-full gap-4">
                    <button onClick={() => window.location.reload()} className="h-16 w-full rounded-full bg-primary text-on-primary font-headline font-black uppercase tracking-tighter text-sm">
                        Restart Discovery
                    </button>
                    <button className="h-16 w-full rounded-full border border-outline font-headline font-black uppercase tracking-tighter text-sm">
                        Adjust Preferences
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[500px] mx-auto h-[min(800px,75vh)] mt-8 mb-24 px-4">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentCard.id}
                    style={{ x, rotate, opacity }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x > 100) handleSwipe("right");
                        else if (info.offset.x < -100) handleSwipe("left");
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
                >
                    {/* Main Card Container */}
                    <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-outline-variant/30 flex flex-col">

                        {/* Image Section */}
                        <div className="relative h-[65%] w-full">
                            <Image
                                src={currentCard.imageUrl}
                                alt={currentCard.make}
                                fill
                                className="object-cover"
                                unoptimized
                                priority
                            />
                            {/* Overlay UI */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Match Tag */}
                            <div className="absolute top-8 left-8 bg-secondary/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
                                <Sparkles size={12} className="text-primary" />
                                <span className="text-primary font-headline text-[10px] font-black uppercase tracking-widest">{currentCard.matchPercentage}% AI Compatibility</span>
                            </div>

                            {/* Swipe Indicators */}
                            <motion.div style={{ opacity: matchOpacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-secondary text-secondary rounded-2xl px-8 py-4 font-headline text-4xl font-black uppercase tracking-tighter rotate-[-15deg] pointer-events-none z-50">
                                SWAP
                            </motion.div>
                            <motion.div style={{ opacity: skipOpacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-error text-error rounded-2xl px-8 py-4 font-headline text-4xl font-black uppercase tracking-tighter rotate-[15deg] pointer-events-none z-50">
                                SKIP
                            </motion.div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <h2 className="font-headline text-4xl font-bold text-white uppercase tracking-tighter leading-none mb-2">
                                    {currentCard.make}<br />{currentCard.model}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{currentCard.source}</span>
                                    <p className="font-label text-white/60 text-[10px] uppercase tracking-[0.3em] truncate">{currentCard.specs.fuel} • {currentCard.specs.transmission}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 bg-white p-8 space-y-8 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1">
                                    <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 font-bold">
                                        <Gauge size={10} className="text-secondary" /> Mileage
                                    </p>
                                    <p className="font-headline text-lg font-bold tracking-tight">{currentCard.specs.mileage || 'N/A'}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-widest flex items-center justify-end gap-1.5 font-bold">
                                        <Droplets size={10} className="text-secondary" /> HP
                                    </p>
                                    <p className="font-headline text-lg font-bold tracking-tight">{currentCard.specs.power || 'N/A'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 font-bold">
                                        <Receipt size={10} className="text-secondary" /> Condition
                                    </p>
                                    <p className="font-headline text-lg font-bold tracking-tight">{currentCard.specs.condition || 'Verified'}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-widest flex items-center justify-end gap-1.5 font-bold">
                                        <Info size={10} className="text-secondary" /> Drive
                                    </p>
                                    <p className="font-headline text-lg font-bold tracking-tight">{currentCard.specs.drive || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant relative">
                                <div>
                                    <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-[0.3em]">Market Valuation</p>
                                    <p className="font-headline text-3xl font-black tracking-tighter text-primary">
                                        {currentCard.currencySymbol}{currentCard.valuation.toLocaleString()}
                                    </p>
                                </div>

                                {currentCard.aiVerification && (
                                    <button
                                        onClick={() => setShowReport(!showReport)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${showReport ? 'bg-secondary border-secondary text-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                                    >
                                        <Sparkles size={12} className={showReport ? 'text-primary' : 'text-secondary'} />
                                        <span className="font-headline text-[9px] font-black uppercase tracking-tight">AI {currentCard.aiVerification.score}%</span>
                                    </button>
                                )}

                                {/* AI Report Overlay */}
                                <AnimatePresence>
                                    {showReport && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-full left-0 right-0 mb-4 bg-primary text-on-primary p-4 rounded-2xl shadow-2xl z-[60]"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles size={14} className="text-secondary" />
                                                <h4 className="font-headline text-[10px] font-black uppercase tracking-widest">{currentCard.aiVerification?.status}</h4>
                                            </div>
                                            <p className="font-body text-[11px] leading-relaxed opacity-90 italic">
                                                "{currentCard.aiVerification?.report}"
                                            </p>
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Action Buttons Floating below */}
            <div className="absolute -bottom-24 left-0 right-0 flex justify-center items-center gap-8">
                <button
                    onClick={() => handleSwipe("left")}
                    className="w-20 h-20 rounded-full bg-white border border-outline-variant text-error shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
                >
                    <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
                <button
                    onClick={() => handleSwipe("right")}
                    className="w-24 h-24 rounded-full bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
                >
                    <Heart size={40} fill="white" className="group-hover:scale-125 transition-transform" />
                </button>
            </div>
        </div>
    );
}

export default function MatchPage() {
    return (
        <div className="bg-background min-h-screen selection:bg-secondary selection:text-black">
            <TopNavBar />

            <main className="pt-28 pb-40 px-6 max-w-[1440px] mx-auto min-h-screen flex flex-col">
                <div className="mb-12 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label text-[10px] uppercase tracking-[0.3em]">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span> Discovery Protocol Active
                    </div>
                    <h1 className="font-headline text-5xl font-black uppercase tracking-tighter leading-tight">
                        Perfect <span className="text-on-surface-variant/20 italic">Matches</span>
                    </h1>
                </div>

                <Suspense fallback={
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="w-12 h-12 border border-outline-variant border-t-secondary rounded-full animate-spin"></div>
                    </div>
                }>
                    <MatchContent />
                </Suspense>
            </main>

            <BottomNavBar />
        </div>
    );
}
