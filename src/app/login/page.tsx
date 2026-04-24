"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        await signIn(email, password);
        router.push("/discover");
        router.refresh();
      } else {
        await signUp(email, password, { fullName: email.split("@")[0] });
        router.push("/discover");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="font-headline text-4xl font-black uppercase tracking-tighter">
              KAR<span className="text-secondary border-b-2 border-primary">SWAP</span>
            </h1>
          </Link>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mt-2">
            The Obsidian Gallery
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-surface-container rounded-full p-1 mb-8">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-3 rounded-full font-label text-[10px] font-bold uppercase tracking-widest transition-all ${
              mode === "signin" ?"bg-primary text-on-primary shadow-sm" :"text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 rounded-full font-label text-[10px] font-bold uppercase tracking-widest transition-all ${
              mode === "signup" ?"bg-primary text-on-primary shadow-sm" :"text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative group">
            <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-0 pr-10 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-lg transition-all focus:border-primary outline-none"
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error/10 border border-error/20 rounded-lg px-4 py-3">
              <p className="font-label text-[11px] text-error uppercase tracking-wider">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 rounded-full bg-primary text-on-primary font-headline font-bold text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-all active:scale-95 shadow-lg disabled:opacity-50 flex items-center justify-center gap-3 mt-8"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
            ) : (
              <>
                {mode === "signin" ? "Enter the Gallery" : "Join KarSwap"}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-surface-container rounded-lg border border-outline-variant/30">
          <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold">
            Demo Access
          </p>
          <p className="font-body text-xs text-on-surface-variant">
            Create a new account or use any email/password to explore the prototype.
          </p>
        </div>

        {/* Skip auth */}
        <div className="text-center mt-6">
          <Link
            href="/discover"
            className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors underline underline-offset-4"
          >
            Browse as Guest
          </Link>
        </div>
      </div>
    </main>
  );
}
