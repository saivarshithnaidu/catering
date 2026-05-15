"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, LayoutGrid } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0.5,
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary-black"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-black/60 via-transparent to-primary-black" />
      
      {/* Visual Background (Placeholder) */}
      <div 
        ref={videoRef}
        className="absolute inset-0 z-0 opacity-60 scale-110"
        style={{
          backgroundImage: "url('/images/hero_catering_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-burgundy/20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 backdrop-blur-sm mb-8"
        >
          <Sparkles className="text-luxury-gold" size={14} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
            The Future of Hospitality
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-serif text-warm-ivory mb-6 leading-tight"
        >
          Luxury Catering <br />
          <span className="gold-gradient italic">Meets Smart AI.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-warm-ivory/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Plan weddings, corporate galas, and luxury celebrations with our 
          AI-powered menu systems and cinematic hospitality experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-10 py-4 bg-luxury-gold text-primary-black font-bold uppercase tracking-widest text-sm rounded-none overflow-hidden transition-all hover:bg-white">
            <span className="relative z-10">Plan Your Event</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button className="group px-10 py-4 border border-warm-ivory/20 text-warm-ivory font-bold uppercase tracking-widest text-sm backdrop-blur-sm transition-all hover:border-luxury-gold hover:text-luxury-gold flex items-center gap-2">
            <LayoutGrid size={18} />
            Explore Packages
          </button>
        </motion.div>
      </div>

      {/* Floating Booking Widget (Visual Only for now) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden xl:flex absolute right-12 bottom-24 z-30 flex-col gap-4"
      >
        <div className="glass p-6 rounded-2xl w-64">
          <p className="text-luxury-gold text-[10px] uppercase tracking-widest mb-2 font-bold">Live Bookings</p>
          <p className="text-warm-ivory text-sm font-medium mb-4">Royal Wedding Package</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-burgundy border border-luxury-gold/30" />
            <div>
              <p className="text-warm-ivory text-xs">Recently booked by</p>
              <p className="text-luxury-gold text-xs font-bold">Aditya & Meera</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-warm-ivory">Scroll</span>
        <ChevronDown size={20} className="text-luxury-gold" />
      </motion.div>
    </section>
  );
};

export default Hero;
