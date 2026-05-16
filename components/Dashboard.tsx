"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMenuStore } from "@/store/useMenuStore";
import { 
  FileText, 
  MessageSquare, 
  Download, 
  Trash2, 
  ChevronRight,
  UtensilsCrossed,
  ChefHat,
  Coffee,
  IceCream,
  Soup
} from "lucide-react";
import { jsPDF } from "jspdf";

const Dashboard = () => {
  const { 
    generatedMenu, 
    totalPrice, 
    guestCount, 
    eventType, 
    budget, 
    foodPreference,
    reset 
  } = useMenuStore();

  if (generatedMenu.length === 0) return null;

  // Group menu items by category
  const categories = Array.from(new Set(generatedMenu.map(item => item.category)));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(74, 14, 26); // Royal Burgundy
    doc.text("ROYALE FEAST CATERING", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Event: ${eventType}`, 20, 40);
    doc.text(`Guests: ${guestCount}`, 20, 50);
    doc.text(`Package: ${budget} (${foodPreference})`, 20, 60);
    doc.text(`Estimated Total: INR ${totalPrice.toLocaleString()}`, 20, 70);
    
    doc.setDrawColor(212, 175, 55); // Luxury Gold
    doc.line(20, 75, 190, 75);
    
    let yPos = 85;
    categories.forEach(cat => {
      doc.setFontSize(14);
      doc.setTextColor(140, 74, 50); // Rich Copper
      doc.text(cat, 20, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const catItems = generatedMenu.filter(item => item.category === cat);
      catItems.forEach(item => {
        doc.text(`• ${item.name}`, 30, yPos);
        doc.text(item.quantity, 160, yPos);
        yPos += 7;
      });
      yPos += 5;
    });
    
    doc.save(`Royale-Feast-Quotation-${eventType}.pdf`);
  };

  const handleWhatsApp = () => {
    const menuStr = generatedMenu.map(item => `*${item.name}*: ${item.quantity}`).join("%0A");
    const message = `Hello Royale Feast! I'm interested in catering for my *${eventType}*.%0A%0A*Event Details:*%0A- Guests: ${guestCount}%0A- Package: ${budget}%0A- Food: ${foodPreference}%0A- Est. Price: ₹${totalPrice.toLocaleString()}%0A%0A*Selected Menu:*%0A${menuStr}%0A%0APlease get in touch!`;
    window.open(`https://wa.me/919999999999?text=${message}`, "_blank");
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'STARTERS': return <Soup className="text-luxury-gold" size={16} />;
      case 'MAIN COURSE': return <ChefHat className="text-luxury-gold" size={16} />;
      case 'DESSERTS': return <IceCream className="text-luxury-gold" size={16} />;
      default: return <UtensilsCrossed className="text-luxury-gold" size={16} />;
    }
  };

  return (
    <section id="dashboard" className="py-24 bg-primary-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-warm-ivory mb-4">Event <span className="gold-gradient italic">Dashboard.</span></h2>
            <p className="text-sm md:text-base text-warm-ivory/60">Review your AI-generated menu and finalize your inquiry.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button 
              onClick={handleDownloadPDF}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-luxury-gold text-luxury-gold text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-primary-black transition-all"
            >
              <Download size={14} /> PDF
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageSquare size={14} /> WhatsApp
            </button>
            <button 
              onClick={reset}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary-burgundy/20 text-warm-ivory/40 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
            >
              <Trash2 size={14} /> Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Visualization */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-3xl overflow-hidden"
              >
                <div className="bg-white/5 px-6 md:px-8 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(cat)}
                    <h4 className="text-warm-ivory font-serif tracking-widest uppercase text-xs md:text-sm">{cat}</h4>
                  </div>
                  <span className="text-[8px] md:text-[10px] text-luxury-gold font-bold uppercase tracking-widest">Calculated for {guestCount} pax</span>
                </div>
                
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {generatedMenu.filter(item => item.category === cat).map((item) => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <div>
                        <p className="text-xs md:text-sm text-warm-ivory font-medium mb-0.5 group-hover:text-luxury-gold transition-colors">{item.name}</p>
                        <p className="text-[8px] md:text-[10px] text-warm-ivory/40 uppercase tracking-widest">Recommended Quantity</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 md:px-3 py-1 bg-luxury-gold/10 text-luxury-gold text-[10px] md:text-xs font-bold rounded-lg border border-luxury-gold/20">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Insights & Recommendations */}
          <div className="space-y-6 md:space-y-8">
            <div className="glass p-6 md:p-8 rounded-3xl border-luxury-gold/20">
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className="text-luxury-gold" size={18} />
                <h4 className="text-warm-ivory font-serif uppercase tracking-widest text-xs md:text-sm">Chef's Recommendations</h4>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] md:text-xs text-warm-ivory/80 leading-relaxed italic">
                    "For a {eventType} of this scale, we recommend adding a 
                    <span className="text-luxury-gold font-bold"> Live Pasta Counter </span> 
                    to engage guests during the transition from starters to main course."
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] md:text-xs text-warm-ivory/80 leading-relaxed italic">
                    "Since you chose <span className="text-luxury-gold font-bold">{foodPreference}</span>, 
                    our signature Dal Royale would be the highlight of your vegetarian selection."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-burgundy/40 border border-luxury-gold/20 p-6 md:p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-luxury-gold/10 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16 blur-2xl md:blur-3xl group-hover:bg-luxury-gold/20 transition-all" />
              <h4 className="text-warm-ivory font-serif text-lg md:text-xl mb-4 relative z-10">Premium Upgrade?</h4>
              <p className="text-warm-ivory/60 text-[10px] md:text-xs mb-6 relative z-10 leading-relaxed">
                Unlock our "Royal Gold" service which includes silver plating, 
                uniformed premium staff, and designer buffet setups.
              </p>
              <button className="text-luxury-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 relative z-10 hover:translate-x-2 transition-transform">
                Inquire about Royal Service <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
