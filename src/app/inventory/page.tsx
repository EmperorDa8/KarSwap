"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Car, ArrowUpRight, Sparkles } from "lucide-react";

interface Listing {
  id: string;
  make: string;
  model: string;
  year: string;
  valuation: number;
  imageUrl: string;
  status: "active" | "pending" | "swapped";
}

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "1",
    make: "Porsche",
    model: "911 GT3",
    year: "2022",
    valuation: 185000,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
];

export default function InventoryPage() {
  const [listings] = useState<Listing[]>(SAMPLE_LISTINGS);

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-32 min-h-screen px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 pt-8">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">
              Your Collection
            </p>
            <h1 className="font-headline text-5xl font-black uppercase tracking-tighter leading-tight">
              My <span className="text-on-surface-variant/20 italic">Garage</span>
            </h1>
          </div>
          <Link
            href="/value"
            className="flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
          >
            <Plus size={16} />
            Add Vehicle
          </Link>
        </div>

        {listings.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-outline-variant rounded-3xl">
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <Car size={32} className="text-on-surface-variant" />
            </div>
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tighter mb-3">No Vehicles Yet</h3>
            <p className="font-body text-on-surface-variant text-sm max-w-xs mb-8">
              List your first vehicle to start swapping with other enthusiasts.
            </p>
            <Link
              href="/value"
              className="px-8 py-4 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
            >
              List a Vehicle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="group relative overflow-hidden bg-surface border border-outline-variant/30 rounded-2xl hover:border-secondary transition-colors duration-500"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={listing.imageUrl}
                    alt={`${listing.make} ${listing.model}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full font-label text-[9px] font-bold uppercase tracking-widest ${
                        listing.status === "active" ?"bg-secondary text-primary"
                          : listing.status === "pending" ?"bg-yellow-100 text-yellow-800" :"bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tighter mb-1">
                    {listing.year} {listing.make} {listing.model}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="font-label text-[8px] text-on-surface-variant uppercase tracking-[0.3em]">
                        Estimated Value
                      </p>
                      <p className="font-headline text-2xl font-black tracking-tighter text-primary">
                        ${listing.valuation.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href="/match"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-primary font-label text-[9px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                    >
                      <Sparkles size={12} />
                      Find Matches
                    </Link>
                  </div>
                </div>

                <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}

            {/* Add new card */}
            <Link
              href="/value"
              className="group flex flex-col items-center justify-center h-64 border-2 border-dashed border-outline-variant rounded-2xl hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors">
                <Plus size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors">
                Add Vehicle
              </span>
            </Link>
          </div>
        )}
      </main>
      <BottomNavBar />
    </>
  );
}
