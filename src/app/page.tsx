import Image from "next/image";
import Link from "next/link";
import TopNavBar from "@/components/layout/TopNavBar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { Play } from "lucide-react";

export default function Home() {
  return (
    <>
      <TopNavBar />

      <main className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden bg-background">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0 bg-surface">
          <Image
            className="w-full h-full object-cover"
            alt="dramatic side profile of a dark sleek luxury sports car on a misty mountain road at twilight with atmospheric lighting and moody tones"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATPNZ6ixUyvxjLS8IWsl9Ll_0XMuQheijAa9zil8gzeZrI0vWzdq90h2VcsICMTFj-JocX8IXlm75b7YAK4KCeLmQZgLDFoRlxic2GHMJAees0jLUkjxAnEuNxYdHjIAgg66pV4tpvxaJkGyhFH3Cp6U1qop8fa8cnf2hNvCsEr2xtaC95UBy_iKYtxxg4b0b36OsyoNQfFCrFnNp0F6JyLUb92mhEz1DG98yLukc8jdtqh4SAZYBT33bLzLKnKg7uJMrScI4zrw-I"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background"></div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-center flex flex-col items-center mt-[-10vh]">
          <h1 className="font-headline font-bold text-[12vw] leading-none tracking-[-0.04em] text-on-surface uppercase mb-8">
            KARSWAP
          </h1>
          {/* Primary Action */}
          <Link href="/discover" className="group relative px-12 py-4 rounded-full border-[1.5px] border-primary text-primary font-label text-xs font-bold uppercase tracking-[0.3rem] hover:bg-primary hover:text-on-primary transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Upload your Car</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
        </div>

        {/* Bottom Layout Elements */}
        <div className="absolute bottom-[calc(4rem+50px)] md:bottom-24 left-0 right-0 px-12 md:px-24 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 z-10 w-full max-w-[1440px] mx-auto">
          {/* Bottom Left Description */}
          <div className="max-w-md text-center md:text-left">
            <p className="font-body text-on-surface-variant leading-[1.8] text-lg opacity-80">
              Find out what your car is worth and discover the perfect trade-in. Upload an image, enter its value, and browse AI-matched options instantly.
            </p>
          </div>

          {/* Bottom Right Media Card */}
          <div className="relative group cursor-pointer hidden md:block">
            <div className="w-64 h-36 rounded-lg overflow-hidden bg-surface-container shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                alt="close up of a luxury car interior dashboard with ambient warm lighting and soft leather textures"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEqsdb6W-Ta_bhq0Cs8kspF813TzYEBoB5sLvoQOGsi5UghHFTLxoY_l8VbyELYGqLYNjmgrPjzcbGodAeMvfqLsFuUytDnjI_1zcMf21nk8te8I2Pnpn-g6BqGWeWfgNedScJXfGwu0lPmMRgOb4Ki0jr5NjscyQIQAPkqcsPojFmWAvA1d9RSOk5_flhw63rEpe9Y6GsoqUoU_axnZ8PinlFaSJF-xABnDEJB3EyPpWgC6aJcMAshHhiJs2CaH8J5vexBOQevGa5"
                fill
              />
              {/* Glassmorphic Strip */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-surface-container-highest/40 backdrop-blur-md flex items-center px-4">
                <span className="font-label text-[8px] font-bold uppercase tracking-widest text-on-surface">Experience Performance</span>
              </div>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-background/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play size={20} className="text-primary fill-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Decoration */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"></div>
      </main>

      <BottomNavBar />
    </>
  );
}
