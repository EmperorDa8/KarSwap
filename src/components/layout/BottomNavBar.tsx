"use client";

import { Compass, Repeat, Car, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavBar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-md flex justify-around items-center px-4 py-3 rounded-full border border-outline-variant shadow-lg shadow-black/5">
            <Link href="/discover" className={`flex flex-col items-center justify-center p-2 hover:scale-110 transition-transform ${isActive('/discover') ? 'text-primary' : 'text-on-surface'}`}>
                <Compass size={20} className={isActive('/discover') ? 'text-primary' : 'text-on-surface-variant'} />
                <span className="font-label text-[8px] font-bold uppercase tracking-widest mt-1">Explore</span>
            </Link>
            <Link href="/match" className="flex flex-col items-center justify-center bg-secondary text-on-secondary rounded-full p-3 -mt-6 border-4 border-background hover:scale-110 transition-all shadow-md">
                <Repeat size={24} className="text-primary font-bold" />
            </Link>
            <Link href="/inventory" className={`flex flex-col items-center justify-center p-2 hover:scale-110 transition-transform ${isActive('/inventory') ? 'text-primary' : 'text-on-surface'}`}>
                <Car size={20} className={isActive('/inventory') ? 'text-primary' : 'text-on-surface-variant'} />
                <span className="font-label text-[8px] font-bold uppercase tracking-widest mt-1">Inventory</span>
            </Link>
            <Link href="/profile" className={`flex flex-col items-center justify-center p-2 hover:scale-110 transition-transform ${isActive('/profile') ? 'text-primary' : 'text-on-surface'}`}>
                <User size={20} className={isActive('/profile') ? 'text-primary' : 'text-on-surface-variant'} />
                <span className="font-label text-[8px] font-bold uppercase tracking-widest mt-1">Account</span>
            </Link>
        </nav>
    );
}
