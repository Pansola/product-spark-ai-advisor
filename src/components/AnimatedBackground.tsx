
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

  const animatedObjects = Array.from({ length: 20 }, (_, i) => {
    const Icon = shoppingIcons[i % shoppingIcons.length];
    const randomDelay = Math.random() * 2; // Delay menor para começar mais rápido
    const randomDuration = 15 + Math.random() * 10;
    const randomSize = 16 + Math.random() * 16;
    const randomOpacity = 0.1 + Math.random() * 0.2;
    const randomStartX = Math.random() * 100;
    const randomStartY = Math.random() * 120; // Posição Y inicial aleatória
    
    return {
      id: i,
      Icon,
      delay: randomDelay,
      duration: randomDuration,
      size: randomSize,
      opacity: randomOpacity,
      startX: randomStartX,
      startY: randomStartY
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
            top: `${obj.startY}%`,
            animationDelay: `${obj.delay}s`,
            animationDuration: `${obj.duration}s`,
            opacity: obj.opacity
          }}
        >
          <obj.Icon 
            size={obj.size} 
            className="text-white/30"
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
