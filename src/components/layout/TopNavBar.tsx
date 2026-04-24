"use client";

import { Search, Menu, Heart, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function TopNavBar() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const displayName = user?.user_metadata?.full_name || user?.email?.split("@")?.[0] || null;
    const initials = displayName ? displayName?.slice(0, 2)?.toUpperCase() : "JD";

    const handleSignOut = async () => {
        try {
            await signOut();
            router?.push("/");
            router?.refresh();
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant px-6 md:px-12 h-20 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <Link href="/" className="font-headline text-2xl font-black uppercase tracking-tighter hover:text-secondary transition-colors">
                    KAR<span className="text-secondary">SWAP</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/discover" className="font-label text-[10px] font-bold uppercase tracking-widest hover:text-secondary transition-colors">Discover</Link>
                    <Link href="/match" className="font-label text-[10px] font-bold uppercase tracking-widest hover:text-secondary transition-colors">AI Match</Link>
                    <Link href="/concierge" className="font-label text-[10px] font-bold uppercase tracking-widest hover:text-secondary transition-colors">Concierge</Link>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4 text-on-surface">
                    <button className="p-2 hover:bg-surface-container rounded-full transition-all">
                        <Search size={18} />
                    </button>
                    <Link href="/inventory" className="p-2 hover:bg-surface-container rounded-full transition-all relative">
                        <Heart size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
                    </Link>
                </div>

                <div className="h-10 w-[1px] bg-outline-variant hidden md:block"></div>

                {user ? (
                    <div className="relative group">
                        <button className="flex items-center gap-3 pl-2 py-1 hover:bg-surface-container rounded-full transition-all pr-4 border border-outline-variant md:border-transparent">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs ring-4 ring-secondary/20">
                                {initials}
                            </div>
                            <span className="hidden md:block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface">{displayName}</span>
                            <Menu size={16} className="md:hidden ml-2 text-on-surface" />
                        </button>
                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-outline-variant rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <Link href="/profile" className="block px-4 py-3 font-label text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-colors rounded-t-xl">
                                Profile
                            </Link>
                            <Link href="/inventory" className="block px-4 py-3 font-label text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                                My Garage
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-3 font-label text-[10px] font-bold uppercase tracking-widest text-error hover:bg-error/5 transition-colors rounded-b-xl"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                    >
                        <LogIn size={14} />
                        <span className="hidden md:block">Sign In</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
