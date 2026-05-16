"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const PremiumCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-primary-black">
      {/* Background with simplified parallax for mobile compatibility */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-105 md:scale-110"
        style={{
          backgroundImage: "url('/images/cta_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll" // Fixed attachment often causes issues on mobile browsers
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/80 to-primary-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-serif text-warm-ivory mb-6 leading-[1.1] md:leading-tight"
        >
          Plan Your Entire <br className="hidden md:block" />
          <span className="gold-gradient italic">Event Online.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-warm-ivory/70 mb-10 md:12 px-4"
        >
          Luxury catering powered by smart digital systems. 
          We build intelligent booking systems that help you plan every detail of your royal celebration.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-6"
        >
          <button onClick={() => {
            document.getElementById('menu-builder')?.scrollIntoView({ behavior: 'smooth' });
          }} className="group relative w-full sm:w-auto px-10 py-5 bg-luxury-gold text-primary-black font-bold uppercase tracking-widest text-xs md:text-sm rounded-none overflow-hidden transition-all hover:bg-white flex items-center justify-center gap-2">
            <span className="relative z-10 flex items-center gap-2">Build Your Menu <ArrowRight size={16} /></span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button className="group w-full sm:w-auto px-10 py-5 border border-warm-ivory/20 text-warm-ivory font-bold uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm transition-all hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center gap-2">
            <Phone size={16} />
            Expert Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumCTA;
