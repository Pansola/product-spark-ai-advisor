
import React from 'react';
import { ShoppingCart, ShoppingBag, Package, CreditCard, Tag, Gift, Truck, Star } from 'lucide-react';

const AnimatedBackground = () => {
  const shoppingIcons = [
    ShoppingCart,
    ShoppingBag,
    Package,
    CreditCard,
    Tag,
    Gift,
    Truck,
    Star
  ];

  const animatedObjects = Array.from({ length: 25 }, (_, i) => {
    const Icon = shoppingIcons[i % shoppingIcons.length];
    const randomDelay = Math.random() * 25;
    const randomDuration = 12 + Math.random() * 8;
    const randomSize = 20 + Math.random() * 20;
    const randomOpacity = 0.15 + Math.random() * 0.25;
    const randomStartX = Math.random() * 100;
    
    return {
      id: i,
      Icon,
      delay: randomDelay,
      duration: randomDuration,
      size: randomSize,
      opacity: randomOpacity,
      startX: randomStartX
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {animatedObjects.map((obj) => (
        <div
          key={obj.id}
          className="absolute animate-float"
          style={{
            left: `${obj.startX}%`,
            animationDelay: `${obj.delay}s`,
            animationDuration: `${obj.duration}s`,
            opacity: obj.opacity
          }}
        >
          <obj.Icon 
            size={obj.size} 
            className="text-white/50 drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
