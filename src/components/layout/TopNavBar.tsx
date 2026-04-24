import { Search, User, Menu, Heart } from 'lucide-react';
import Link from 'next/link';

export default function TopNavBar() {
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
                    <button className="p-2 hover:bg-surface-container rounded-full transition-all relative">
                        <Heart size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
                    </button>
                </div>

                <div className="h-10 w-[1px] bg-outline-variant hidden md:block"></div>

                <button className="flex items-center gap-3 pl-2 py-1 items-center hover:bg-surface-container rounded-full transition-all pr-4 border border-outline-variant md:border-transparent">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs ring-4 ring-secondary/20">
                        JD
                    </div>
                    <span className="hidden md:block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface">James D.</span>
                    <Menu size={16} className="md:hidden ml-2 text-on-surface" />
                </button>
            </div>
        </nav>
    );
}
