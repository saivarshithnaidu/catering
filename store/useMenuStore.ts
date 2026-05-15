import { create } from 'zustand';

export type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Housewarming' | 'Reception' | 'Luxury Private Event';
export type FoodPreference = 'Pure Veg' | 'Veg + Non Veg' | 'Luxury Premium Menu';
export type BudgetTier = 'Budget' | 'Standard' | 'Luxury';
export type PlanningMode = 'AI' | 'Custom';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  price?: number;
  multiplier?: number;
  unit?: string;
}

interface MenuState {
  planningMode: PlanningMode;
  eventType: EventType | null;
  guestCount: number;
  foodPreference: FoodPreference | null;
  budget: BudgetTier | null;
  
  generatedMenu: MenuItem[];
  customMenuItems: MenuItem[];
  totalPrice: number;
  perPlatePrice: number;

  setPlanningMode: (mode: PlanningMode) => void;
  setEventType: (type: EventType) => void;
  setGuestCount: (count: number) => void;
  setFoodPreference: (pref: FoodPreference) => void;
  setBudget: (budget: BudgetTier) => void;
  toggleCustomMenuItem: (item: MenuItem) => void;
  generateMenu: () => void;
  recalculateCustomPrice: () => void;
  reset: () => void;
}

const pricingMap: Record<BudgetTier, number> = {
  Budget: 350,
  Standard: 650,
  Luxury: 1250,
};

export const CATALOG_ITEMS: MenuItem[] = [
  // STARTERS (20 Items)
  { id: 's1', name: 'Royal Paneer Saffron Tikka', category: 'STARTERS', quantity: '', price: 150, multiplier: 0.15, unit: 'KG' },
  { id: 's2', name: 'Crispy Corn & Water Chestnut Galette', category: 'STARTERS', quantity: '', price: 120, multiplier: 0.12, unit: 'KG' },
  { id: 's3', name: 'Truffle Scented Mushroom Duplex', category: 'STARTERS', quantity: '', price: 200, multiplier: 0.1, unit: 'KG' },
  { id: 's4', name: 'Zimikand Galouti Kebab', category: 'STARTERS', quantity: '', price: 140, multiplier: 0.12, unit: 'KG' },
  { id: 's5', name: 'Palak Patta Chaat with Anar', category: 'STARTERS', quantity: '', price: 100, multiplier: 0.15, unit: 'KG' },
  { id: 's6', name: 'Tandoori Malai Broccoli', category: 'STARTERS', quantity: '', price: 160, multiplier: 0.15, unit: 'KG' },
  { id: 's7', name: 'Dahi Ke Kebab', category: 'STARTERS', quantity: '', price: 130, multiplier: 0.12, unit: 'KG' },
  { id: 's8', name: 'Vegetable Seekh Kebab', category: 'STARTERS', quantity: '', price: 110, multiplier: 0.15, unit: 'KG' },
  { id: 's9', name: 'Paneer Peshawari Tikka', category: 'STARTERS', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 's10', name: 'Stuffed Tandoori Aloo', category: 'STARTERS', quantity: '', price: 100, multiplier: 0.15, unit: 'KG' },
  { id: 's11', name: 'Lotus Stem Honey Chilli', category: 'STARTERS', quantity: '', price: 130, multiplier: 0.1, unit: 'KG' },
  { id: 's12', name: 'Cheese & Jalapeno Poppers', category: 'STARTERS', quantity: '', price: 120, multiplier: 0.12, unit: 'KG' },
  { id: 's13', name: 'Hara Bhara Kebab', category: 'STARTERS', quantity: '', price: 100, multiplier: 0.12, unit: 'KG' },
  { id: 's14', name: 'Soya Chaap Malai Tikka', category: 'STARTERS', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 's15', name: 'Peshawari Chole Samosa', category: 'STARTERS', quantity: '', price: 90, multiplier: 1.5, unit: 'PCS' },
  { id: 's16', name: 'Mini Raj Kachori', category: 'STARTERS', quantity: '', price: 110, multiplier: 1, unit: 'PCS' },
  { id: 's17', name: 'Afghani Soya Tikka', category: 'STARTERS', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 's18', name: 'Spinach & Cheese Fatayer', category: 'STARTERS', quantity: '', price: 160, multiplier: 1.5, unit: 'PCS' },
  { id: 's19', name: 'Mushroom Tikka Masala', category: 'STARTERS', quantity: '', price: 150, multiplier: 0.15, unit: 'KG' },
  { id: 's20', name: 'Beetroot & Peanut Croquettes', category: 'STARTERS', quantity: '', price: 130, multiplier: 1.5, unit: 'PCS' },

  // SOUPS & SALADS (10 Items)
  { id: 'ss1', name: 'Cream of Tomato with Basil', category: 'SOUPS', quantity: '', price: 80, multiplier: 0.2, unit: 'LTR' },
  { id: 'ss2', name: 'Sweet Corn Veg Soup', category: 'SOUPS', quantity: '', price: 80, multiplier: 0.2, unit: 'LTR' },
  { id: 'ss3', name: 'Lemon Coriander Clear Soup', category: 'SOUPS', quantity: '', price: 70, multiplier: 0.2, unit: 'LTR' },
  { id: 'ss4', name: 'Manchow Soup with Crispy Noodles', category: 'SOUPS', quantity: '', price: 85, multiplier: 0.2, unit: 'LTR' },
  { id: 'ss5', name: 'Roasted Pumpkin & Thyme Soup', category: 'SOUPS', quantity: '', price: 90, multiplier: 0.2, unit: 'LTR' },
  { id: 'ss6', name: 'Fresh Green Salad Board', category: 'SALADS', quantity: '', price: 60, multiplier: 0.05, unit: 'KG' },
  { id: 'ss7', name: 'Mediterranean Greek Salad', category: 'SALADS', quantity: '', price: 110, multiplier: 0.08, unit: 'KG' },
  { id: 'ss8', name: 'Aloo Tikki Chaat Salad', category: 'SALADS', quantity: '', price: 90, multiplier: 0.1, unit: 'KG' },
  { id: 'ss9', name: 'Waldorf Apple & Walnut Salad', category: 'SALADS', quantity: '', price: 130, multiplier: 0.08, unit: 'KG' },
  { id: 'ss10', name: 'Russian Salad', category: 'SALADS', quantity: '', price: 100, multiplier: 0.1, unit: 'KG' },

  // MAIN COURSE (15 Items)
  { id: 'mc1', name: 'Dal Royale (24-hour slow cooked)', category: 'MAIN COURSE', quantity: '', price: 180, multiplier: 0.20, unit: 'KG' },
  { id: 'mc2', name: 'Paneer Butter Masala', category: 'MAIN COURSE', quantity: '', price: 200, multiplier: 0.20, unit: 'KG' },
  { id: 'mc3', name: 'Shahi Paneer in White Gravy', category: 'MAIN COURSE', quantity: '', price: 220, multiplier: 0.20, unit: 'KG' },
  { id: 'mc4', name: 'Kadai Paneer', category: 'MAIN COURSE', quantity: '', price: 190, multiplier: 0.18, unit: 'KG' },
  { id: 'mc5', name: 'Malai Kofta with Gold Vark', category: 'MAIN COURSE', quantity: '', price: 210, multiplier: 0.15, unit: 'KG' },
  { id: 'mc6', name: 'Dal Tadka Dhaba Style', category: 'MAIN COURSE', quantity: '', price: 120, multiplier: 0.15, unit: 'KG' },
  { id: 'mc7', name: 'Palak Paneer', category: 'MAIN COURSE', quantity: '', price: 180, multiplier: 0.20, unit: 'KG' },
  { id: 'mc8', name: 'Paneer Lababdar', category: 'MAIN COURSE', quantity: '', price: 200, multiplier: 0.20, unit: 'KG' },
  { id: 'mc9', name: 'Matar Mushroom Masala', category: 'MAIN COURSE', quantity: '', price: 170, multiplier: 0.15, unit: 'KG' },
  { id: 'mc10', name: 'Soya Chaap Rogan Josh', category: 'MAIN COURSE', quantity: '', price: 180, multiplier: 0.18, unit: 'KG' },
  { id: 'mc11', name: 'Pindi Chole', category: 'MAIN COURSE', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 'mc12', name: 'Rajma Rasmeesa', category: 'MAIN COURSE', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 'mc13', name: 'Amritsari Wadi Aloo', category: 'MAIN COURSE', quantity: '', price: 130, multiplier: 0.15, unit: 'KG' },
  { id: 'mc14', name: 'Dum Aloo Kashmiri', category: 'MAIN COURSE', quantity: '', price: 150, multiplier: 0.15, unit: 'KG' },
  { id: 'mc15', name: 'Vegetable Jalfrezi', category: 'MAIN COURSE', quantity: '', price: 160, multiplier: 0.15, unit: 'KG' },

  // VEG CURRIES & SIDES (15 Items)
  { id: 'vc1', name: 'Subz Diwani Handi', category: 'VEG CURRIES', quantity: '', price: 160, multiplier: 0.15, unit: 'KG' },
  { id: 'vc2', name: 'Bhindi Do Pyaza', category: 'VEG CURRIES', quantity: '', price: 140, multiplier: 0.12, unit: 'KG' },
  { id: 'vc3', name: 'Baingan Bharta', category: 'VEG CURRIES', quantity: '', price: 130, multiplier: 0.12, unit: 'KG' },
  { id: 'vc4', name: 'Aloo Gobi Adraki', category: 'VEG CURRIES', quantity: '', price: 120, multiplier: 0.15, unit: 'KG' },
  { id: 'vc5', name: 'Navratan Korma', category: 'VEG CURRIES', quantity: '', price: 180, multiplier: 0.15, unit: 'KG' },
  { id: 'vc6', name: 'Mushroom Do Pyaza', category: 'VEG CURRIES', quantity: '', price: 160, multiplier: 0.15, unit: 'KG' },
  { id: 'vc7', name: 'Methi Malai Matar', category: 'VEG CURRIES', quantity: '', price: 170, multiplier: 0.15, unit: 'KG' },
  { id: 'vc8', name: 'Corn Palak', category: 'VEG CURRIES', quantity: '', price: 150, multiplier: 0.15, unit: 'KG' },
  { id: 'vc9', name: 'Jeera Aloo', category: 'VEG CURRIES', quantity: '', price: 100, multiplier: 0.1, unit: 'KG' },
  { id: 'vc10', name: 'Mix Veg Dry', category: 'VEG CURRIES', quantity: '', price: 130, multiplier: 0.12, unit: 'KG' },
  { id: 'vc11', name: 'Kadi Pakora', category: 'VEG CURRIES', quantity: '', price: 120, multiplier: 0.15, unit: 'KG' },
  { id: 'vc12', name: 'Lauki Kofta', category: 'VEG CURRIES', quantity: '', price: 130, multiplier: 0.15, unit: 'KG' },
  { id: 'vc13', name: 'Gatta Curry (Rajasthani)', category: 'VEG CURRIES', quantity: '', price: 140, multiplier: 0.15, unit: 'KG' },
  { id: 'vc14', name: 'Stuffed Capsicum', category: 'VEG CURRIES', quantity: '', price: 130, multiplier: 0.8, unit: 'PCS' },
  { id: 'vc15', name: 'Sarson Ka Saag (Seasonal)', category: 'VEG CURRIES', quantity: '', price: 160, multiplier: 0.15, unit: 'KG' },

  // BREADS (10 Items)
  { id: 'b1', name: 'Butter Naan', category: 'BREADS', quantity: '', price: 30, multiplier: 1.5, unit: 'PCS' },
  { id: 'b2', name: 'Garlic Naan', category: 'BREADS', quantity: '', price: 40, multiplier: 1.0, unit: 'PCS' },
  { id: 'b3', name: 'Tandoori Roti', category: 'BREADS', quantity: '', price: 20, multiplier: 1.0, unit: 'PCS' },
  { id: 'b4', name: 'Missi Roti', category: 'BREADS', quantity: '', price: 35, multiplier: 0.5, unit: 'PCS' },
  { id: 'b5', name: 'Laccha Paratha', category: 'BREADS', quantity: '', price: 45, multiplier: 0.8, unit: 'PCS' },
  { id: 'b6', name: 'Pudina Paratha', category: 'BREADS', quantity: '', price: 45, multiplier: 0.5, unit: 'PCS' },
  { id: 'b7', name: 'Roomali Roti', category: 'BREADS', quantity: '', price: 35, multiplier: 0.5, unit: 'PCS' },
  { id: 'b8', name: 'Chur Chur Naan', category: 'BREADS', quantity: '', price: 55, multiplier: 0.5, unit: 'PCS' },
  { id: 'b9', name: 'Amritsari Kulcha', category: 'BREADS', quantity: '', price: 60, multiplier: 0.5, unit: 'PCS' },
  { id: 'b10', name: 'Assorted Bread Basket', category: 'BREADS', quantity: '', price: 120, multiplier: 0.5, unit: 'BASKET' },

  // RICE (10 Items)
  { id: 'r1', name: 'Lucknowi Dum Veg Biryani', category: 'RICE', quantity: '', price: 180, multiplier: 0.15, unit: 'KG' },
  { id: 'r2', name: 'Hyderabadi Veg Biryani', category: 'RICE', quantity: '', price: 180, multiplier: 0.15, unit: 'KG' },
  { id: 'r3', name: 'Steamed Basmati Rice', category: 'RICE', quantity: '', price: 80, multiplier: 0.1, unit: 'KG' },
  { id: 'r4', name: 'Jeera Rice', category: 'RICE', quantity: '', price: 90, multiplier: 0.1, unit: 'KG' },
  { id: 'r5', name: 'Matar Pulao', category: 'RICE', quantity: '', price: 110, multiplier: 0.1, unit: 'KG' },
  { id: 'r6', name: 'Kashmiri Pulao (Sweet)', category: 'RICE', quantity: '', price: 150, multiplier: 0.1, unit: 'KG' },
  { id: 'r7', name: 'Navratan Pulao', category: 'RICE', quantity: '', price: 140, multiplier: 0.1, unit: 'KG' },
  { id: 'r8', name: 'Saffron Veg Pulao', category: 'RICE', quantity: '', price: 160, multiplier: 0.1, unit: 'KG' },
  { id: 'r9', name: 'Burnt Garlic Fried Rice', category: 'RICE', quantity: '', price: 130, multiplier: 0.12, unit: 'KG' },
  { id: 'r10', name: 'Curd Rice with Tadka', category: 'RICE', quantity: '', price: 100, multiplier: 0.1, unit: 'KG' },

  // DESSERTS (12 Items)
  { id: 'd1', name: 'Angoori Gulab Jamun', category: 'DESSERTS', quantity: '', price: 80, multiplier: 2.0, unit: 'PCS' },
  { id: 'd2', name: 'Saffron Rasmalai', category: 'DESSERTS', quantity: '', price: 120, multiplier: 1.2, unit: 'PCS' },
  { id: 'd3', name: 'Moong Dal Halwa (Desi Ghee)', category: 'DESSERTS', quantity: '', price: 110, multiplier: 0.08, unit: 'KG' },
  { id: 'd4', name: 'Gajar Ka Halwa (Seasonal)', category: 'DESSERTS', quantity: '', price: 100, multiplier: 0.08, unit: 'KG' },
  { id: 'd5', name: 'Rabri Jalebi Live', category: 'DESSERTS', quantity: '', price: 90, multiplier: 0.1, unit: 'KG' },
  { id: 'd6', name: 'Baked Blueberry Cheesecake Bites', category: 'DESSERTS', quantity: '', price: 150, multiplier: 1.2, unit: 'PCS' },
  { id: 'd7', name: 'Dark Chocolate Brownie with Ice Cream', category: 'DESSERTS', quantity: '', price: 130, multiplier: 1.0, unit: 'PCS' },
  { id: 'd8', name: 'Paan Shot (Digestive)', category: 'DESSERTS', quantity: '', price: 50, multiplier: 1.0, unit: 'SHOTS' },
  { id: 'd9', name: 'Rajbhog', category: 'DESSERTS', quantity: '', price: 90, multiplier: 1.0, unit: 'PCS' },
  { id: 'd10', name: 'Tiramisu Cups', category: 'DESSERTS', quantity: '', price: 140, multiplier: 1.0, unit: 'PCS' },
  { id: 'd11', name: 'Shahi Tukda', category: 'DESSERTS', quantity: '', price: 110, multiplier: 1.0, unit: 'PCS' },
  { id: 'd12', name: 'Assorted Premium Ice Creams', category: 'DESSERTS', quantity: '', price: 100, multiplier: 1.5, unit: 'SCOOPS' },

  // LIVE COUNTERS (8 Items)
  { id: 'l1', name: 'Live Exotic Pasta & Risotto Station', category: 'LIVE COUNTERS', quantity: '', price: 250, multiplier: 0, unit: 'SETUP' },
  { id: 'l2', name: 'Live Delhi Chaat Counter', category: 'LIVE COUNTERS', quantity: '', price: 180, multiplier: 0, unit: 'SETUP' },
  { id: 'l3', name: 'Live Dimsum & Sushi Bar (Veg)', category: 'LIVE COUNTERS', quantity: '', price: 300, multiplier: 0, unit: 'SETUP' },
  { id: 'l4', name: 'Live Wok Tossed Noodles', category: 'LIVE COUNTERS', quantity: '', price: 200, multiplier: 0, unit: 'SETUP' },
  { id: 'l5', name: 'Live Appam & Stew Counter', category: 'LIVE COUNTERS', quantity: '', price: 180, multiplier: 0, unit: 'SETUP' },
  { id: 'l6', name: 'Live Tawa Veg Counter', category: 'LIVE COUNTERS', quantity: '', price: 160, multiplier: 0, unit: 'SETUP' },
  { id: 'l7', name: 'Live Dosa & Idli Station', category: 'LIVE COUNTERS', quantity: '', price: 150, multiplier: 0, unit: 'SETUP' },
  { id: 'l8', name: 'Live Waffles & Crepes', category: 'LIVE COUNTERS', quantity: '', price: 220, multiplier: 0, unit: 'SETUP' },
];

export const useMenuStore = create<MenuState>((set, get) => ({
  planningMode: 'AI',
  eventType: null,
  guestCount: 100,
  foodPreference: null,
  budget: null,
  generatedMenu: [],
  customMenuItems: [],
  totalPrice: 0,
  perPlatePrice: 0,

  setPlanningMode: (mode) => set({ planningMode: mode }),

  setEventType: (type) => {
    set({ eventType: type });
    if (get().planningMode === 'AI') get().generateMenu();
  },
  
  setGuestCount: (count) => {
    set({ guestCount: count });
    if (get().planningMode === 'AI') {
      const budget = get().budget;
      if (budget) {
        set({ totalPrice: count * pricingMap[budget] });
      }
      get().generateMenu();
    } else {
      get().recalculateCustomPrice();
    }
  },
  
  setFoodPreference: (pref) => {
    set({ foodPreference: pref });
    if (get().planningMode === 'AI') get().generateMenu();
  },
  
  setBudget: (budget) => {
    const basePrice = pricingMap[budget];
    set({ budget, perPlatePrice: basePrice, totalPrice: get().guestCount * basePrice });
    if (get().planningMode === 'AI') get().generateMenu();
  },

  toggleCustomMenuItem: (item) => {
    const { customMenuItems } = get();
    const exists = customMenuItems.find(i => i.id === item.id);
    if (exists) {
      set({ customMenuItems: customMenuItems.filter(i => i.id !== item.id) });
    } else {
      set({ customMenuItems: [...customMenuItems, item] });
    }
    get().recalculateCustomPrice();
  },

  recalculateCustomPrice: () => {
    const { customMenuItems, guestCount } = get();
    
    // Calculate raw sum of selected items
    const rawSum = customMenuItems.reduce((sum, item) => sum + (item.price || 0), 0);
    
    // Catering volume logic: Guest stomach capacity is limited (approx equivalent to 12 items full portions)
    const STANDARD_MENU_SIZE = 12;
    const numItems = customMenuItems.length;
    
    // If they select more than 12 items, the marginal cost and quantity per item decreases
    // The 1.25 factor accounts for the premium overhead of managing a huge buffet variety
    const volumeFactor = numItems <= STANDARD_MENU_SIZE ? 1 : (STANDARD_MENU_SIZE / numItems) * 1.25;
    
    const perPlate = numItems === 0 ? 0 : Math.round(rawSum * volumeFactor);
    
    // Safe consumption factor for kitchen (slightly higher than price volumeFactor to prevent running out of food)
    const consumptionFactor = numItems <= STANDARD_MENU_SIZE ? 1 : (STANDARD_MENU_SIZE / numItems) * 1.5;

    set({
      perPlatePrice: perPlate,
      totalPrice: guestCount * perPlate,
      generatedMenu: customMenuItems.map(item => {
        let calculatedQuantity = "";
        if (item.unit === 'SETUP') {
          calculatedQuantity = "1 SETUP";
        } else if (item.unit === 'SHOTS' || item.unit === 'SCOOPS') {
          // Shots/scoops don't usually scale down per person, maybe slightly
          const amount = Math.ceil(guestCount * (item.multiplier || 1));
          calculatedQuantity = `${amount} ${item.unit}`;
        } else {
          // Apply consumption factor for KG/PCS/LTR since people eat much smaller portions of each when there are 100 items
          const amount = (guestCount * (item.multiplier || 0.1) * consumptionFactor);
          // Round to 1 decimal for KG/LTR, whole numbers for PCS
          const finalAmount = item.unit === 'KG' || item.unit === 'LTR' ? amount.toFixed(1) : Math.ceil(amount);
          calculatedQuantity = `${finalAmount} ${item.unit || 'KG'}`;
        }
        return {
          ...item,
          quantity: calculatedQuantity
        };
      })
    });
  },

  generateMenu: () => {
    const { eventType, guestCount, foodPreference, budget, planningMode } = get();
    if (planningMode === 'Custom' || !eventType || !foodPreference || !budget) return;

    const basePrice = pricingMap[budget];
    const items: MenuItem[] = [];

    items.push({ id: 's1', name: foodPreference === 'Pure Veg' ? 'Royal Paneer Saffron Tikka' : 'Murgh Malai Pistachio Tikka', category: 'STARTERS', quantity: `${Math.round(guestCount * 0.15)} KG` });
    items.push({ id: 's2', name: 'Crispy Corn & Water Chestnut Galette', category: 'STARTERS', quantity: `${Math.round(guestCount * 0.12)} KG` });
    if (budget === 'Luxury') items.push({ id: 's3', name: 'Truffle Scented Mushroom Duplex', category: 'STARTERS', quantity: `${Math.round(guestCount * 0.1)} KG` });

    items.push({ id: 'm1', name: foodPreference === 'Pure Veg' ? 'Dal Royale (24-hour slow cooked)' : 'Butter Chicken Essence', category: 'MAIN COURSE', quantity: `${Math.round(guestCount * 0.2)} KG` });
    items.push({ id: 'm2', name: 'Subz Diwani Handi with Gold Vark', category: 'VEG CURRIES', quantity: `${Math.round(guestCount * 0.15)} KG` });
    
    if (foodPreference !== 'Pure Veg') items.push({ id: 'n1', name: 'Royal Mutton Rogan Josh with Ratan Jot', category: 'NON VEG CURRIES', quantity: `${Math.round(guestCount * 0.18)} KG` });

    items.push({ id: 'r1', name: 'Lucknowi Dum Pukht Biryani', category: 'RICE', quantity: `${Math.round(guestCount * 0.12)} KG` });
    items.push({ id: 'b1', name: 'Artisanal Bread Basket (Khamiri/Naan)', category: 'BREADS', quantity: `${Math.round(guestCount * 2.5)} PCS` });
    items.push({ id: 'd1', name: 'Angoori Gulab Jamun with Saffron Rabri', category: 'DESSERTS', quantity: `${Math.round(guestCount * 1.5)} PCS` });
    
    if (budget !== 'Budget') items.push({ id: 'd2', name: 'Baked Blueberry Cheesecake Bites', category: 'DESSERTS', quantity: `${Math.round(guestCount * 1.2)} PCS` });
    
    if (budget === 'Luxury' || eventType === 'Wedding') items.push({ id: 'l1', name: 'Live Exotic Pasta & Risotto Station', category: 'LIVE COUNTERS', quantity: '1 SETUP' });
    items.push({ id: 'w1', name: 'Infused Detox Water & Mocktail Bar', category: 'WATER / DRINKS', quantity: `${Math.round(guestCount * 0.3)} LTR` });

    set({ generatedMenu: items, totalPrice: guestCount * basePrice, perPlatePrice: basePrice });
  },

  reset: () => set({
    planningMode: 'AI',
    eventType: null,
    guestCount: 100,
    foodPreference: null,
    budget: null,
    generatedMenu: [],
    customMenuItems: [],
    totalPrice: 0,
    perPlatePrice: 0,
  }),
}));
