// src/services/api.js

const metals = [
  {
    id: 'gold',
    name: 'Gold',
    description: 'Gold is a dense, soft, shiny, and highly malleable and ductile metal.',
    symbol: 'XAU',
    basePrice: 6000,
    volatility: 0.005,
    color: '#FFD700', 
    gradient: ['#F9A826', '#FFB74D'],
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'Silver is a soft, white, lustrous transition metal.',
    symbol: 'XAG',
    basePrice: 75,
    volatility: 0.015,
    color: '#E0E0E0', 
    gradient: ['#9E9E9E', '#CFD8DC'],
    image: 'https://images.unsplash.com/photo-1598084991519-c90900bc9df0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'Platinum is a dense, malleable, ductile, highly unreactive, precious, silver-white transition metal.',
    symbol: 'XPT',
    basePrice: 2500,
    volatility: 0.008,
    color: '#E5E4E2',
    gradient: ['#607D8B', '#B0BEC5'],
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'palladium',
    name: 'Palladium',
    description: 'Palladium is a rare and lustrous silvery-white transition metal.',
    symbol: 'XPD',
    basePrice: 3000,
    volatility: 0.02,
    color: '#CED0DD',
    gradient: ['#795548', '#BCAAA4'],
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
      resolve(metals.map(({ id, name, symbol, color, gradient, image }) => ({ id, name, symbol, color, gradient, image })));
    }, 400); 
  });
};

export const fetchMetalLiveData = async (metalId) => {
  // Random delay between 800ms and 2500ms
  const delay = Math.floor(Math.random() * 1700) + 800;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance to simulate a network error
      if (Math.random() < 0.1) {
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
        currency: 'USD',
        unit: 'oz'
      });
    }, delay);
  });
};
