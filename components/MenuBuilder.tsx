"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore, EventType, FoodPreference, BudgetTier, CATALOG_ITEMS } from "@/store/useMenuStore";
import { 
  Users, 
  Utensils, 
  IndianRupee, 
  Calendar, 
  ChevronRight, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ListPlus
} from "lucide-react";

const aiSteps = [
  { id: 1, name: "Event Type", icon: Calendar },
  { id: 2, name: "Guest Count", icon: Users },
  { id: 3, name: "Preference", icon: Utensils },
  { id: 4, name: "Budget", icon: IndianRupee },
];

const customSteps = [
  { id: 1, name: "Event Type", icon: Calendar },
  { id: 2, name: "Guest Count", icon: Users },
  { id: 3, name: "Build Menu", icon: ListPlus },
];

const eventTypes: EventType[] = [
  "Wedding", "Birthday", "Corporate", "Housewarming", "Reception", "Luxury Private Event"
];

const foodPreferences: FoodPreference[] = [
  "Pure Veg", "Veg + Non Veg", "Luxury Premium Menu"
];

const budgets: { label: BudgetTier, price: string, desc: string }[] = [
  { label: "Budget", price: "₹350/Plate", desc: "Essential luxury for intimate gatherings" },
  { label: "Standard", price: "₹650/Plate", desc: "Premium experience with diverse menu" },
  { label: "Luxury", price: "₹1250/Plate", desc: "Ultra-premium royal hospitality" },
];

const MenuBuilder = () => {
  const { 
    planningMode, setPlanningMode,
    eventType, setEventType,
    guestCount, setGuestCount,
    foodPreference, setFoodPreference,
    budget, setBudget,
    totalPrice, perPlatePrice,
    generatedMenu,
    customMenuItems, toggleCustomMenuItem
  } = useMenuStore();

  const [currentStep, setCurrentStep] = useState(1);

  const steps = planningMode === 'AI' ? aiSteps : customSteps;

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleModeSwitch = (mode: 'AI' | 'Custom') => {
    setPlanningMode(mode);
    setCurrentStep(1);
  };

  const categories = Array.from(new Set(CATALOG_ITEMS.map(item => item.category)));

  return (
    <section id="menu-builder" className="py-24 bg-primary-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-burgundy rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex p-1 bg-white/5 rounded-full border border-white/10 mb-8"
          >
            <button 
              onClick={() => handleModeSwitch('AI')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${planningMode === 'AI' ? 'bg-luxury-gold text-primary-black' : 'text-warm-ivory/40 hover:text-warm-ivory'}`}
            >
              AI Smart Menu
            </button>
            <button 
              onClick={() => handleModeSwitch('Custom')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${planningMode === 'Custom' ? 'bg-luxury-gold text-primary-black' : 'text-warm-ivory/40 hover:text-warm-ivory'}`}
            >
              Custom Selection
            </button>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-4"
          >
            {planningMode === 'AI' ? (
              <>AI Menu <span className="gold-gradient italic">Architect.</span></>
            ) : (
              <>Build Your <span className="gold-gradient italic">Feast.</span></>
            )}
          </motion.h2>
          <p className="text-warm-ivory/60 max-w-xl mx-auto">
            {planningMode === 'AI' 
              ? "Our intelligent engine designs the perfect culinary experience based on your event dynamics and preferences."
              : "Hand-pick the exact dishes for your event from our premium culinary catalog."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Progress Sidebar */}
          <div className="lg:col-span-3">
            <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-8 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                    <div className={`
                      w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-500
                      ${isActive ? "bg-luxury-gold text-primary-black shadow-lg shadow-luxury-gold/20" : 
                        isCompleted ? "bg-primary-burgundy text-luxury-gold" : "bg-white/5 text-warm-ivory/40"}
                    `}>
                      {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                    </div>
                    <div className="hidden lg:block">
                      <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${isActive ? "text-luxury-gold" : "text-warm-ivory/40"}`}>
                        Step 0{step.id}
                      </p>
                      <p className={`text-sm font-medium ${isActive ? "text-warm-ivory" : "text-warm-ivory/40"}`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Builder Area */}
          <div className="lg:col-span-6">
            <div className="glass p-8 md:p-12 rounded-3xl min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <h3 className="text-2xl font-serif text-warm-ivory mb-8">What type of event are you hosting?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {eventTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => { setEventType(type); handleNext(); }}
                          className={`
                            p-6 rounded-2xl text-left transition-all duration-300 border
                            ${eventType === type ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold" : "bg-white/5 border-white/5 text-warm-ivory/60 hover:bg-white/10"}
                          `}
                        >
                          <span className="text-sm font-medium tracking-wide">{type}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <h3 className="text-2xl font-serif text-warm-ivory mb-8">How many guests are attending?</h3>
                    <div className="space-y-12 py-10">
                      <div className="relative">
                        <input 
                          type="range" 
                          min="50" 
                          max="2000" 
                          step="50"
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                        />
                        <div className="flex justify-between mt-4 text-[10px] text-warm-ivory/40 uppercase tracking-widest font-bold">
                          <span>50 Guests</span>
                          <span>1000 Guests</span>
                          <span>2000+ Guests</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-7xl font-serif text-luxury-gold">{guestCount}</span>
                        <span className="text-warm-ivory/40 ml-4 uppercase tracking-[0.3em] text-sm">Guests</span>
                      </div>
                      <button 
                        onClick={handleNext}
                        className="w-full py-4 bg-luxury-gold text-primary-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                      >
                        Next Step <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {planningMode === 'AI' && currentStep === 3 && (
                  <motion.div
                    key="step3_ai"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <h3 className="text-2xl font-serif text-warm-ivory mb-8">Select your food preference</h3>
                    <div className="space-y-4">
                      {foodPreferences.map((pref) => (
                        <button
                          key={pref}
                          onClick={() => { setFoodPreference(pref); handleNext(); }}
                          className={`
                            w-full p-6 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between
                            ${foodPreference === pref ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold" : "bg-white/5 border-white/5 text-warm-ivory/60 hover:bg-white/10"}
                          `}
                        >
                          <span className="text-lg font-medium">{pref}</span>
                          {foodPreference === pref && <CheckCircle2 size={24} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {planningMode === 'AI' && currentStep === 4 && (
                  <motion.div
                    key="step4_ai"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <h3 className="text-2xl font-serif text-warm-ivory mb-8">Choose your budget tier</h3>
                    <div className="space-y-4">
                      {budgets.map((b) => (
                        <button
                          key={b.label}
                          onClick={() => setBudget(b.label)}
                          className={`
                            w-full p-6 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between group
                            ${budget === b.label ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold" : "bg-white/5 border-white/5 text-warm-ivory/60 hover:bg-white/10"}
                          `}
                        >
                          <div>
                            <span className="text-lg font-bold block">{b.label}</span>
                            <span className="text-xs text-warm-ivory/40 group-hover:text-warm-ivory/60 transition-colors">{b.desc}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-serif block">{b.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {budget && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full mt-8 py-4 bg-luxury-gold text-primary-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-luxury-gold/20"
                      >
                        Generate Smart Menu <Sparkles size={18} />
                      </motion.button>
                    )}
                  </motion.div>
                )}

                {planningMode === 'Custom' && currentStep === 3 && (
                  <motion.div
                    key="step3_custom"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 max-h-[500px] overflow-y-auto pr-2"
                  >
                    <h3 className="text-2xl font-serif text-warm-ivory mb-6 sticky top-0 bg-[#161314] py-2 z-10">Select Your Exact Menu</h3>
                    <div className="space-y-8">
                      {categories.map((cat) => (
                        <div key={cat}>
                          <h4 className="text-luxury-gold text-[10px] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">{cat}</h4>
                          <div className="space-y-3">
                            {CATALOG_ITEMS.filter(i => i.category === cat).map(item => {
                              const isSelected = !!customMenuItems.find(i => i.id === item.id);
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => toggleCustomMenuItem(item)}
                                  className={`w-full p-4 rounded-xl text-left flex justify-between items-center transition-all border
                                    ${isSelected ? 'bg-luxury-gold/10 border-luxury-gold' : 'bg-white/5 border-white/5 hover:border-white/20'}
                                  `}
                                >
                                  <div>
                                    <p className={`text-sm font-medium ${isSelected ? 'text-luxury-gold' : 'text-warm-ivory'}`}>{item.name}</p>
                                    <p className="text-[10px] text-warm-ivory/40 uppercase tracking-wider mt-1">+ ₹{item.price} per plate</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-luxury-gold border-luxury-gold text-primary-black' : 'border-white/20 text-transparent'}`}>
                                    <CheckCircle2 size={14} />
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentStep > 1 && (
                <button 
                  onClick={handleBack}
                  className="mt-8 text-warm-ivory/40 text-xs uppercase tracking-widest font-bold hover:text-warm-ivory transition-colors text-left"
                >
                  ← Back to Previous Step
                </button>
              )}
            </div>
          </div>

          {/* Real-time Summary */}
          <div className="lg:col-span-3">
            <div className="bg-primary-burgundy/20 border border-luxury-gold/10 p-6 rounded-3xl sticky top-32">
              <h4 className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Booking Summary</h4>
              
              <div className="space-y-6">
                <div>
                  <p className="text-warm-ivory/40 text-[10px] uppercase tracking-widest mb-1">Event Details</p>
                  <p className="text-warm-ivory text-sm font-serif">{eventType || "—"} • {guestCount} Guests</p>
                </div>
                
                <div>
                  <p className="text-warm-ivory/40 text-[10px] uppercase tracking-widest mb-1">Mode & Package</p>
                  <p className="text-warm-ivory text-sm font-serif">
                    {planningMode === 'AI' 
                      ? `${budget || "—"} (${foodPreference || "—"})`
                      : `Custom Build (${customMenuItems.length} items)`}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-warm-ivory/40 text-[10px] uppercase tracking-widest">Est. Pricing</p>
                    <p className="text-luxury-gold text-2xl font-serif">₹{totalPrice.toLocaleString()}</p>
                  </div>
                  <p className="text-[10px] text-warm-ivory/30 text-right">Per Plate: ₹{perPlatePrice}</p>
                </div>

                <button 
                  onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  disabled={planningMode === 'AI' ? !budget : customMenuItems.length === 0}
                  className={`
                    w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                    ${(planningMode === 'AI' ? budget : customMenuItems.length > 0) ? "bg-white text-primary-black hover:bg-luxury-gold" : "bg-white/5 text-white/20 cursor-not-allowed"}
                  `}
                >
                  {planningMode === 'Custom' ? 'Finalize Custom Menu' : 'Get Full Quotation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBuilder;
