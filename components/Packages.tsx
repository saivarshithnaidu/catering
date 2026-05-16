"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Star, ShieldCheck } from "lucide-react";

const packages = [
  {
    name: "Royal Wedding",
    price: "₹1250",
    image: "/images/package_luxury.png",
    features: ["50+ Luxury Dishes", "Silver Service", "Designer Buffet", "Premium Staff", "Live Fruit Counter"],
    isPopular: true
  },
  {
    name: "Corporate Gala",
    price: "₹850",
    image: "/images/package_standard.png",
    features: ["Global Cuisine", "Elegant Setup", "Quick Service", "Barista Coffee", "Sanitization Priority"],
    isPopular: false
  },
  {
    name: "Intimate Soirée",
    price: "₹650",
    image: "/images/package_intimate.png",
    features: ["Boutique Menu", "Home Setup", "Chef at Home", "Personalized Decor", "Zero Waste"],
    isPopular: false
  }
];

const Packages = () => {
  return (
    <section id="packages" className="py-24 bg-primary-black overflow-hidden relative">
      {/* Decorative background element that might cause overflow */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-luxury-gold/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-4"
          >
            Curated <span className="gold-gradient italic">Experiences.</span>
          </motion.h2>
          <p className="text-warm-ivory/60">Choose from our signature hospitality collections.</p>
        </div>

        {/* Mobile: Horizontal scroll with snap / Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: idx === 0 ? 0 : 30 }} // Less movement on mobile
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: idx * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="relative group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-luxury-gold/50 transition-all duration-500 min-w-[85vw] md:min-w-0 snap-center"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent" />
                
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 bg-luxury-gold text-primary-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="currentColor" /> Most Wanted
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-serif text-warm-ivory mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-luxury-gold text-2xl font-serif">{pkg.price}</span>
                  <span className="text-warm-ivory/40 text-[10px] uppercase tracking-widest">/ Per Plate</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-warm-ivory/70">
                      <Check className="text-luxury-gold" size={16} />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 border border-luxury-gold/30 text-warm-ivory text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-luxury-gold hover:text-primary-black transition-all">
                  View Full Menu
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Bar - Improved Mobile Layout */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "100% Hygiene", sub: "FSSAI Certified", icon: ShieldCheck },
            { label: "Elite Chefs", sub: "Global Experience", icon: Sparkles },
            { label: "Smart Booking", sub: "Instant Quotations", icon: Star },
            { label: "Eco-Friendly", sub: "Sustainable Practices", icon: Check }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-2 group">
              <div className="flex justify-center mb-2">
                <item.icon className="text-luxury-gold/50 group-hover:text-luxury-gold transition-colors" size={24} />
              </div>
              <p className="text-warm-ivory font-bold text-[10px] md:text-xs uppercase tracking-widest">{item.label}</p>
              <p className="text-warm-ivory/40 text-[8px] md:text-[10px] uppercase tracking-tight">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
