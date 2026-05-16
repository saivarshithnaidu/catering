"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Menu Builder", href: "#menu-builder" },
    { name: "Packages", href: "#packages" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-primary-black/90 backdrop-blur-lg py-3 shadow-2xl border-b border-white/5"
          : mobileMenuOpen ? "bg-primary-black py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col relative z-[110]"
        >
          <span className="text-xl md:text-3xl font-serif font-bold tracking-widest text-luxury-gold uppercase leading-tight">
            Royale Feast
          </span>
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-warm-ivory/60 uppercase -mt-0.5">
            Catering Excellence
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-medium tracking-wide text-warm-ivory/80 hover:text-luxury-gold transition-colors uppercase"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-luxury-gold text-primary-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-luxury-gold/20"
          >
            <Calendar size={14} />
            Book Now
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 relative z-[110]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-luxury-gold p-2 -mr-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved for stability */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 md:hidden bg-primary-black border-t border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6 bg-primary-black/95 backdrop-blur-xl">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-warm-ivory hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-luxury-gold text-primary-black px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest w-full flex justify-center items-center gap-2 shadow-xl shadow-luxury-gold/20"
              >
                <Calendar size={16} />
                Plan Your Event
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
