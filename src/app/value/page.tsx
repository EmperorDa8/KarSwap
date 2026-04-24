"use client";
import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Upload } from "lucide-react";

export default function ValueEstimation() {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [condition, setCondition] = useState("Excellent");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const searchParams = new URLSearchParams({
            make,
            model,
            year: year || "",
            mileage: mileage || "",
            condition
        });

        // Redirect to discover page, letting it do the fetching
        router.push(`/discover?${searchParams.toString()}`);
    };

    return (
        <>
            <TopNavBar />

            <main className="pt-24 pb-32 min-h-screen flex flex-col px-6 md:px-12 max-w-[1440px] mx-auto">
                {/* Top Section: Image Upload Area */}
                <section className="flex flex-col items-center w-full mb-8">
                    <div className="w-full aspect-[16/10] md:aspect-[21/9] relative group cursor-pointer overflow-hidden rounded-lg bg-surface-container-low border border-outline-variant/50 hover:border-primary/50 transition-colors">
                        <div
                            className="absolute inset-0 opacity-20 grayscale group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAadDZk-O5IhHi3z1wziyzc7Rbk0wvn50j7LmyK5UW_G0M3cvSJNtDJz8sJSngXpkRFwbrbWAWrHxhp8vnWdGIoFKkP03Xvzd0QvALzjh48uoZkD3uS7c-ZAaFiJoNkbe_mF1ASBSKh3PhBLLqX579Ym9n_doe_56Wq09BbUMGS78vJq_4gYVaAMEsFZzv0btuP2KbuFhpi3xubn6pu22UZu5GQgK1zRrnlwVh6KtGinRSCTvYalZvVclr14GmqGvEzbH0mShOv2pOW')" }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center m-4 rounded-lg">
                            <Upload className="text-primary mb-4 w-12 h-12" strokeWidth={1.5} />
                            <h2 className="font-headline font-bold text-lg tracking-[0.2em] text-primary uppercase text-center px-4">UPLOAD VEHICLE IMAGES</h2>
                            <p className="font-body text-xs text-on-surface-variant/60 mt-2 tracking-tighter uppercase">Front, Side, Interior, and Odometer</p>
                        </div>
                    </div>
                </section>

                <section className="flex-grow w-full bg-surface-container-low rounded-t-xl px-6 py-12 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-12">
                            <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface uppercase mb-2">VEHICLE DETAILS</h3>
                            <p className="font-body text-on-surface-variant text-sm">Provide accurate data for a precise obsidian-grade valuation.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {/* Make */}
                            <div className="relative group">
                                <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">Make</label>
                                <input
                                    required
                                    value={make}
                                    onChange={(e) => setMake(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
                                    placeholder="e.g. Porsche"
                                    type="text"
                                />
                            </div>
                            {/* Model */}
                            <div className="relative group">
                                <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">Model</label>
                                <input
                                    required
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
                                    placeholder="e.g. 911 GT3 RS"
                                    type="text"
                                />
                            </div>
                            {/* Year */}
                            <div className="relative group">
                                <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">Year</label>
                                <input
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
                                    placeholder="2024"
                                    type="number"
                                />
                            </div>
                            {/* Mileage */}
                            <div className="relative group">
                                <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">Mileage</label>
                                <input
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
                                    placeholder="5000"
                                    type="number"
                                />
                            </div>
                            {/* Condition */}
                            <div className="md:col-span-2 relative group">
                                <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-4">Condition</label>
                                <div className="flex flex-wrap gap-3">
                                    {['Pristine', 'Excellent', 'Good', 'Fair'].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setCondition(c)}
                                            className={`px-6 py-2 rounded-sm text-xs font-bold tracking-widest uppercase transition-all ${condition === c ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary/20 hover:text-primary'}`}
                                            type="button"
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Call to Action */}
                            <div className="md:col-span-2 mt-12 flex justify-center">
                                <button disabled={isLoading} className="w-full md:w-auto md:min-w-[320px] px-12 py-5 rounded-full bg-surface-container-high/60 backdrop-blur-xl border border-primary/20 text-primary font-headline font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.3)] disabled:opacity-50" type="submit">
                                    {isLoading ? 'ANALYZING...' : 'GET ESTIMATED VALUE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <BottomNavBar />
        </>
    );
}
