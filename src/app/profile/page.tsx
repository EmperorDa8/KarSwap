"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Car, Heart, Settings, LogOut, ChevronRight, Star, Clock, Shield } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router?.push("/");
      router?.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")?.[0] || "Guest";
  const initials = displayName?.slice(0, 2)?.toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border border-outline-variant border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-32 min-h-screen px-6 md:px-12 max-w-[800px] mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12 pt-8">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-primary font-headline font-black text-3xl ring-4 ring-secondary/20 mb-4">
            {initials}
          </div>
          <h1 className="font-headline text-3xl font-black uppercase tracking-tighter">{displayName}</h1>
          {user?.email && (
            <p className="font-label text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">{user?.email}</p>
          )}
          {!user && (
            <Link href="/login" className="mt-4 px-8 py-3 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
              Sign In to Your Account
            </Link>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Swaps", value: "0", icon: Car },
            { label: "Saved", value: "0", icon: Heart },
            { label: "Rating", value: "—", icon: Star },
          ]?.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-surface-container rounded-xl p-4 text-center border border-outline-variant/30">
              <Icon size={20} className="text-on-surface-variant mx-auto mb-2" />
              <p className="font-headline text-2xl font-black tracking-tighter">{value}</p>
              <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">{label}</p>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {[
            { label: "My Listings", icon: Car, href: "/inventory" },
            { label: "Saved Vehicles", icon: Heart, href: "/discover" },
            { label: "Swap History", icon: Clock, href: "/success" },
            { label: "Verification", icon: Shield, href: "/value" },
            { label: "Settings", icon: Settings, href: "#" },
          ]?.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-outline-variant/30 hover:border-primary/30 hover:bg-surface-container-high transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Icon size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <span className="font-label text-[11px] font-bold uppercase tracking-widest">{label}</span>
              </div>
              <ChevronRight size={16} className="text-on-surface-variant" />
            </Link>
          ))}
        </div>

        {/* Sign Out */}
        {user && (
          <button
            onClick={handleSignOut}
            className="w-full mt-8 py-4 rounded-full border border-error/30 text-error font-label text-[10px] font-bold uppercase tracking-widest hover:bg-error/5 transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        )}
      </main>
      <BottomNavBar />
    </>
  );
}
