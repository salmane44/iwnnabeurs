
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen10_Personality: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setTimeout(onComplete, 1500);
  };

  const options = [
    { emoji: "👊", text: "Threaten to hit him (even if I have to jump)." },
    { emoji: "💅", text: "Remind him that dynamite comes in small packages." },
    { emoji: "🤐", text: "The silent treatment until he apologizes with food." }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#fff0f5]">
      {/* Background Pop Art Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ff69b4 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Decorative Comic Elements - Moved to corners for mobile safety */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [-10, 10, -10] }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute top-4 left-4 md:top-10 md:left-20 bg-yellow-400 text-black font-black text-sm md:text-xl p-2 md:p-4 transform -rotate-12 border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' }}
      >
        POW!
      </motion.div>

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
        className="absolute bottom-4 right-4 md:bottom-10 md:right-20 bg-blue-400 text-white font-black text-sm md:text-xl p-2 md:p-4 transform rotate-6 border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0"
      >
        BAM!
      </motion.div>

      {/* Main Analysis Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8 overflow-y-auto max-h-[85vh]"
      >
        <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-4">
           <div className="bg-black text-white p-2 rounded-full shrink-0">
              <Zap className="w-5 h-5 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
           </div>
           <div>
             <h2 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-black">Personality Matrix</h2>
             <p className="font-bold text-black flex items-center gap-1 text-xs md:text-base">
               <Activity className="w-3 h-3 md:w-4 md:h-4" /> Result: Pure Dynamite
             </p>
           </div>
        </div>

        <p className="font-bold text-black text-sm md:text-lg mb-4 leading-relaxed">
          You are <span className="bg-pink-200 px-1 text-black">1.62m</span> of unstoppable energy. You counter-attack every joke Salmane makes, and you never back down.
        </p>

        <div className="bg-gray-100 p-3 md:p-4 border-2 border-black border-dashed mb-6 relative mt-4">
          <span className="absolute -top-3 -left-2 bg-black text-white text-[10px] md:text-xs px-2 py-1 font-bold transform -rotate-2">SCENARIO</span>
          <p className="font-medium text-black italic text-sm md:text-base">
            "Salmane makes a joke about your height..."
          </p>
        </div>

        <h3 className="font-black text-center text-base md:text-lg mb-4 text-black">What is your signature counter-attack?</h3>

        <div className="space-y-3">
          {options.map((opt, i) => (
             <motion.button
               key={i}
               whileHover={{ scale: 1.02, x: 5 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => handleSelect(i)}
               className={`
                 w-full p-3 md:p-4 text-left border-2 border-black font-bold flex items-center gap-3 transition-colors
                 ${selected === i 
                   ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1 -translate-y-1' 
                   : 'bg-white hover:bg-pink-50'
                 }
               `}
             >
               <span className="text-xl md:text-2xl shrink-0">{opt.emoji}</span>
               <span className="text-xs md:text-base text-black">{opt.text}</span>
             </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Screen10_Personality;
