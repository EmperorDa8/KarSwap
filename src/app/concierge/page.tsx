"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { useState } from "react";
import { MessageCircle, Phone, Calendar, ChevronRight, Sparkles, Clock } from "lucide-react";

interface ConciergeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  eta: string;
}

const OPTIONS: ConciergeOption[] = [
  {
    id: "chat",
    title: "Live Chat Support",
    description: "Connect with a KarSwap specialist for personalized swap guidance.",
    icon: MessageCircle,
    eta: "< 2 min",
  },
  {
    id: "call",
    title: "Schedule a Call",
    description: "Book a dedicated consultation with our vehicle exchange experts.",
    icon: Phone,
    eta: "Same day",
  },
  {
    id: "inspection",
    title: "Vehicle Inspection",
    description: "Request a certified AI-assisted inspection for your vehicle.",
    icon: Sparkles,
    eta: "24–48 hrs",
  },
  {
    id: "appointment",
    title: "In-Person Appointment",
    description: "Visit a KarSwap partner location for a hands-on swap experience.",
    icon: Calendar,
    eta: "2–3 days",
  },
];

export default function ConciergePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitted(true);
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-32 min-h-screen px-6 md:px-12 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12 pt-8">
          <div className="flex items-center gap-2 text-on-surface-variant font-label text-[10px] uppercase tracking-[0.3em] mb-4">
            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            White Glove Service
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-4">
            Concierge <br />
            <span className="text-on-surface-variant/20 italic">Service</span>
          </h1>
          <p className="font-body text-on-surface-variant text-lg max-w-xl">
            Our dedicated team of vehicle exchange specialists is ready to guide you through every step of your swap journey.
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div className="flex flex-col items-center text-center py-20">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter mb-3">Request Received</h2>
            <p className="font-body text-on-surface-variant max-w-sm mb-8">
              A KarSwap concierge specialist will reach out to you shortly. Expect contact within the estimated timeframe.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelected(null); setMessage(""); }}
              className="px-8 py-4 rounded-full border border-outline font-label text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-all"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selected === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelected(option.id)}
                    className={`text-left p-6 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-on-primary" :"border-outline-variant bg-surface-container hover:border-primary/40 hover:bg-surface-container-high"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? "bg-on-primary/10" : "bg-surface-container-high"}`}>
                        <Icon size={22} className={isSelected ? "text-on-primary" : "text-on-surface-variant"} />
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${isSelected ? "bg-on-primary/10 text-on-primary" : "bg-surface-container-highest text-on-surface-variant"}`}>
                        <Clock size={10} />
                        {option.eta}
                      </div>
                    </div>
                    <h3 className={`font-headline text-lg font-bold uppercase tracking-tighter mb-1 ${isSelected ? "text-on-primary" : ""}`}>
                      {option.title}
                    </h3>
                    <p className={`font-body text-sm ${isSelected ? "text-on-primary/70" : "text-on-surface-variant"}`}>
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Message */}
            <div className="relative group">
              <label className="block font-headline text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-transparent border border-outline-variant/50 rounded-xl py-3 px-4 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 font-body text-base transition-all focus:border-primary outline-none resize-none"
                placeholder="Tell us about your vehicle and what you're looking for..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!selected}
              className="w-full py-5 rounded-full bg-primary text-on-primary font-headline font-bold text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-all active:scale-95 shadow-lg disabled:opacity-40 flex items-center justify-center gap-3"
            >
              Request Concierge Service
              <ChevronRight size={18} />
            </button>
          </form>
        )}
      </main>
      <BottomNavBar />
    </>
  );
}
