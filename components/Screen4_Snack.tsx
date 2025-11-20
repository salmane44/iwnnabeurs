
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Pizza, Candy, IceCream, Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen4_Snack: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const snacks = [
    { id: 'pizza', icon: <Pizza className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />, name: "Pizza" },
    { id: 'coffee', icon: <Coffee className="w-10 h-10 md:w-12 md:h-12 text-amber-800" />, name: "Coffee" }, // Correct
    { id: 'candy', icon: <Candy className="w-10 h-10 md:w-12 md:h-12 text-pink-500" />, name: "Candy" },
    { id: 'icecream', icon: <IceCream className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />, name: "Ice Cream" },
  ];

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    if (id === 'coffee') {
      setTimeout(onComplete, 2000);
    } else {
      // Quick reset for wrong answer for playability, though script implies just choosing one.
      // Let's assume they must pick coffee.
      setTimeout(() => setSelected(null), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -100 }}
      className="flex flex-col items-center justify-center h-full w-full p-4 z-10"
    >
      <div className="bg-pink-50/90 backdrop-blur p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-2xl w-full border-4 border-white">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 animate-pulse">
            EMERGENCY CUTENESS PROTOCOL 🚨
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-pink-700 mb-2">Post-Study Recovery</h2>
          <p className="text-sm md:text-base text-gray-600">
            You've studied for 8 hours! Salmane needs to send the perfect snack. 
            <br/><span className="text-pink-500 font-semibold">Choose wisely!</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {snacks.map((snack) => (
            <motion.button
              key={snack.id}
              onClick={() => handleSelect(snack.id)}
              whileHover={{ scale: 1.05, rotate: Math.random() * 2 - 1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative aspect-square rounded-2xl border-4 flex flex-col items-center justify-center gap-2 transition-all
                ${selected === snack.id 
                  ? snack.id === 'coffee' 
                    ? 'bg-amber-100 border-amber-400 ring-4 ring-amber-200' 
                    : 'bg-gray-100 border-gray-300 grayscale'
                  : 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-xl'
                }
              `}
            >
              {selected === snack.id && snack.id === 'coffee' && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                >
                   <Sparkles className="w-24 h-24 md:w-32 md:h-32 text-yellow-400 animate-spin-slow" />
                </motion.div>
              )}
              
              {snack.icon}
              <span className="font-bold text-gray-700 text-sm md:text-base">{snack.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Screen4_Snack;
