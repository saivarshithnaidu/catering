import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuBuilder from "@/components/MenuBuilder";
import Dashboard from "@/components/Dashboard";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import PremiumCTA from "@/components/PremiumCTA";
import { Camera, MessageSquare, Mail, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-primary-black overflow-hidden">
      <Navbar />
      <Hero />
      <Packages />
      <MenuBuilder />
      <Dashboard />
      <Gallery />
      <PremiumCTA />
      
      {/* SECTION 10 — FOOTER */}
      <footer className="pt-24 pb-12 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col mb-6">
                <span className="text-3xl font-serif font-bold tracking-widest text-luxury-gold uppercase">
                  Royale Feast
                </span>
                <span className="text-[10px] tracking-[0.3em] text-warm-ivory/60 uppercase -mt-1">
                  Catering Excellence
                </span>
              </div>
              <p className="text-warm-ivory/40 text-sm max-w-md leading-relaxed">
                We don't build normal catering websites. We build smart catering booking systems that help customers plan entire events online. Experience the pinnacle of luxury hospitality.
              </p>
            </div>
            
            <div>
              <h4 className="text-warm-ivory font-serif text-lg mb-6 tracking-widest uppercase">Services</h4>
              <ul className="space-y-4">
                {["Royal Weddings", "Corporate Galas", "Intimate Soirées", "Smart Menu Builder"].map(item => (
                  <li key={item}>
                    <a href="#" className="text-warm-ivory/40 text-xs font-bold uppercase tracking-widest hover:text-luxury-gold transition-colors inline-flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-luxury-gold group-hover:w-4 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-warm-ivory font-serif text-lg mb-6 tracking-widest uppercase">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-warm-ivory/40 text-xs font-bold uppercase tracking-widest hover:text-luxury-gold transition-colors flex items-center gap-3">
                    <Camera size={16} className="text-luxury-gold/70" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-warm-ivory/40 text-xs font-bold uppercase tracking-widest hover:text-luxury-gold transition-colors flex items-center gap-3">
                    <MessageSquare size={16} className="text-[#25D366]" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-warm-ivory/40 text-xs font-bold uppercase tracking-widest hover:text-luxury-gold transition-colors flex items-center gap-3">
                    <Mail size={16} className="text-luxury-gold/70" /> events@growxlabs.tech
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <p className="text-luxury-gold/50 text-[10px] uppercase tracking-widest">
              © 2026 Royale Feast Catering.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-warm-ivory/30 text-[10px] uppercase tracking-widest hover:text-warm-ivory transition-colors">Privacy</a>
              <a href="#" className="text-warm-ivory/30 text-[10px] uppercase tracking-widest hover:text-warm-ivory transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
