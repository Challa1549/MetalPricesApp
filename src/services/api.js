// src/services/api.js

const metals = [
  {
    id: 'gold-24k',
    name: 'Gold (24K)',
    description: '24K Gold is 99.9% pure, representing the ultimate standard for global wealth holding and physical reserve investment.',
    symbol: 'XAU-24K',
    basePrice: 15700.00, // Adjusted relative to 22K
    volatility: 0.003,
    color: '#D4AF37', 
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gold-22k',
    name: 'Gold (22K)',
    description: '22K Gold contains 91.6% pure gold. Known for its durability, it is the premier choice for crafting high-end jewelry and portfolio diversification.',
    symbol: 'XAU-22K',
    basePrice: 14400.00, // Exact user value
    volatility: 0.003,
    color: '#C59B27', 
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'A versatile highly-conductive metal heavily utilized in both industrial manufacturing and premium commodity trading.',
    symbol: 'XAG',
    basePrice: 180.50,
    volatility: 0.015,
    color: '#B0BEC5', 
    image: 'https://images.unsplash.com/photo-1598084991519-c90900bc9df0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'An exceptionally dense, highly unreactive, and rare silver-white transition metal often trading at premium multiples.',
    symbol: 'XPT',
    basePrice: 5800.00,
    volatility: 0.008,
    color: '#90A4AE',
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'palladium',
    name: 'Palladium',
    description: 'A critical industrial metal essential for modern catalytic converters, historically commanding dynamic market premiums.',
    symbol: 'XPD',
    basePrice: 6500.00,
    volatility: 0.02,
    color: '#A1887F',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80'
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
  const delay = Math.floor(Math.random() * 800) + 400;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const metal = metals.find(m => m.id === metalId);
      if (!metal) {
        reject(new Error('Asset not found'));
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
