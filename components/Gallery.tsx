"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Award, Heart, Camera } from "lucide-react";

const Gallery = () => {
  return (
    <section className="py-24 bg-primary-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 mb-4"
          >
            <Camera size={12} className="text-luxury-gold" />
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Visual Excellence</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-4"
          >
            Cinematic <span className="gold-gradient italic">Moments.</span>
          </motion.h2>
          <p className="text-warm-ivory/60 max-w-xl mx-auto">
            Experience the grandeur of our luxury catering setups. From drone wedding videos to impeccable hygiene standards.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <div className="md:col-span-8 h-[400px] relative rounded-3xl overflow-hidden group">
            <img src="/images/gallery_wedding.png" alt="Wedding Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-primary-black/40 group-hover:bg-primary-black/20 transition-all" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/50 flex items-center justify-center text-warm-ivory group-hover:scale-110 group-hover:bg-luxury-gold group-hover:text-primary-black transition-all">
                <Play fill="currentColor" size={24} className="ml-2" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 text-warm-ivory">
              <p className="font-serif text-2xl">Royal Wedding Setup</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold">Cinematic Drone Tour</p>
            </div>
          </div>
          <div className="md:col-span-4 h-[400px] relative rounded-3xl overflow-hidden group">
            <img src="/images/gallery_chef.png" alt="Chef Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-warm-ivory">
              <p className="font-serif text-xl">Our Elite Chefs</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold">Global Culinary Experience</p>
            </div>
          </div>
          <div className="md:col-span-4 h-[300px] relative rounded-3xl overflow-hidden group">
            <img src="/images/gallery_buffet.png" alt="Buffet Display" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-warm-ivory">
              <p className="font-serif text-xl">Designer Buffet</p>
            </div>
          </div>
          <div className="md:col-span-8 h-[300px] relative rounded-3xl overflow-hidden group bg-primary-burgundy/20 border border-luxury-gold/10 p-10 flex flex-col justify-center items-center text-center">
            <Heart className="text-luxury-gold mb-6" size={40} />
            <h3 className="text-2xl md:text-3xl font-serif text-warm-ivory mb-4">"The most spectacular food presentation we have ever seen at a wedding."</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold">— Aditya & Meera, Mumbai</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-16">
          {[
            { stat: "500+", label: "Luxury Events" },
            { stat: "100%", label: "Hygiene Certified" },
            { stat: "50+", label: "Elite Chefs" },
            { stat: "1M+", label: "Plates Served" }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-luxury-gold mb-2">{item.stat}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-ivory/60 font-bold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
