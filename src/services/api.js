// src/services/api.js

const metals = [
  {
    id: 'gold-24k',
    name: 'Gold (24 Carat)',
    description: '24K Gold is 99.9% pure, highly sought-after precious metal for pure investment and global standard holding.',
    symbol: 'XAU-24K',
    basePrice: 7350.50, // Accurate 24K price per gram
    volatility: 0.003,
    color: '#D4AF37', 
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gold-22k',
    name: 'Gold (22 Carat)',
    description: '22K Gold contains 91.6% pure gold mixed with alloys like zinc or copper for strength. Heavily used in Indian jewelry.',
    symbol: 'XAU-22K',
    basePrice: 6738.00, // Accurate 22K price per gram
    volatility: 0.003,
    color: '#C59B27', 
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'Silver is widely used for industrial applications, medical equipment, and traditional jewelry.',
    symbol: 'XAG',
    basePrice: 85.50, // Accurate Silver price per gram
    volatility: 0.015,
    color: '#9E9E9E', 
    image: 'https://images.unsplash.com/photo-1598084991519-c90900bc9df0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'Platinum is a dense, highly unreactive, precious silver-white transition metal.',
    symbol: 'XPT',
    basePrice: 2470.00,
    volatility: 0.008,
    color: '#607D8B',
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'palladium',
    name: 'Palladium',
    description: 'Palladium is essential for catalytic converters and robust industrial use.',
    symbol: 'XPD',
    basePrice: 2820.00,
    volatility: 0.02,
    color: '#795548',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80' // A beautiful metallic ring specifically for Palladium
  }
];

const generatePrice = (base, vol) => {
  const change = base * vol * (Math.random() - 0.5);
  return (base + change).toFixed(2);
};

export const fetchMetalsList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(metals.map(({ id, name, symbol, color, image }) => ({ id, name, symbol, color, image })));
    }, 400); 
  });
};

export const fetchMetalLiveData = async (metalId) => {
  // Shorter, more reliable delay without active network fails
  const delay = Math.floor(Math.random() * 800) + 400;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock network failure completely removed per user instruction 

      const metal = metals.find(m => m.id === metalId);
      if (!metal) {
        reject(new Error('Metal not found'));
        return;
      }

      const currentPrice = parseFloat(generatePrice(metal.basePrice, metal.volatility));
      const previousClose = metal.basePrice;
      const previousOpen = parseFloat(generatePrice(metal.basePrice, metal.volatility * 0.5));
      const timestamp = new Date().toISOString();

      resolve({
        ...metal, 
        currentPrice,
        previousClose,
        previousOpen,
        timestamp,
        currency: 'INR',
        unit: 'gram'
      });
    }, delay);
  });
};
