// src/services/api.js

const metals = [
  {
    id: 'gold',
    name: 'Gold (24K)',
    description: 'Gold is a highly sought-after precious metal for investment and jewelry in India.',
    symbol: 'GOLD',
    basePrice: 7350.50,
    volatility: 0.003,
    color: '#F4B400', 
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'Silver is widely used for industrial applications and traditional jewelry.',
    symbol: 'SILV',
    basePrice: 91.20,
    volatility: 0.015,
    color: '#9E9E9E', 
    image: 'https://images.unsplash.com/photo-1598084991519-c90900bc9df0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'Platinum is a dense, highly unreactive, precious silver-white transition metal.',
    symbol: 'PLAT',
    basePrice: 2850.00,
    volatility: 0.008,
    color: '#607D8B',
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'palladium',
    name: 'Palladium',
    description: 'Palladium is essential for catalytic converters and industrial use.',
    symbol: 'PALL',
    basePrice: 2600.00,
    volatility: 0.02,
    color: '#795548',
    image: 'https://images.unsplash.com/photo-1606760227091-306fc6bf4749?auto=format&fit=crop&q=80&w=800'
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
  const delay = Math.floor(Math.random() * 1200) + 600;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error('Network error. Failed to fetch data.'));
        return;
      }

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
