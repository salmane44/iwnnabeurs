
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CarFront, Flag, Trophy, Handshake } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen12_Racing: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setTimeout(onComplete, 1500);
  };

  const options = [
    { icon: <Flag className="w-5 h-5 text-red-600" />, text: "Me. Ferrari on top! 🏎️" },
    { icon: <Trophy className="w-5 h-5 text-yellow-600" />, text: "Salmane... because he puts up with me." },
    { icon: <Handshake className="w-5 h-5 text-blue-600" />, text: "We both win. We make the perfect team." }
  ];

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Animated Road Background */}
      <div className="absolute inset-0 flex justify-center opacity-30 pointer-events-none">
         <div className="w-full max-w-lg bg-gray-800 h-full relative border-x-8 border-yellow-500 border-dashed">
            {/* Moving road lines */}
            <motion.div 
               className="absolute left-1/2 top-0 bottom-0 w-4 -ml-2 bg-[length:20px_100px] bg-repeat-y"
               style={{ backgroundImage: 'linear-gradient(to bottom, white 50%, transparent 50%)' }}
               animate={{ backgroundPositionY: [0, 1000] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
         </div>
      </div>

      {/* Main Content Card - Push to top */}
      <div className="z-20 w-full max-w-lg px-4 pt-4 md:pt-12 mb-auto mt-4">
        <motion.div 
           initial={{ y: -50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl border-b-8 border-red-500"
        >
           <h2 className="text-xl md:text-2xl font-black italic uppercase text-gray-800 text-center mb-2">
             <span className="text-red-600">Grand Prix</span> of "Us"
           </h2>
           <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">
              <span>Rivalry: High</span>
              <span>Subject: F1</span>
           </div>
           
           <p className="text-black text-xs md:text-base text-center font-medium mb-4">
              You argue about Lewis and Ferrari. You tease each other constantly.
              But looking at this data... this doesn't look like a war. It looks like a race where you're driving <b>together</b>.
           </p>

           <h3 className="text-center font-bold text-black mb-4 text-sm md:text-base">In this race, who is actually winning?</h3>

           <div className="space-y-2 md:space-y-3">
              {options.map((opt, i) => (
                 <motion.button
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleSelect(i)}
                   className={`
                      w-full p-2 md:p-3 rounded-xl flex items-center gap-2 md:gap-3 font-bold transition-all border-2
                      ${selected === i 
                         ? 'bg-gray-100 border-gray-800 text-black' 
                         : 'bg-white border-gray-200 text-black hover:border-red-400'
                      }
                   `}
                 >
                    <div className="bg-gray-100 p-2 rounded-full shrink-0">{opt.icon}</div>
                    <span className="text-xs md:text-base text-left">{opt.text}</span>
                 </motion.button>
              ))}
           </div>
        </motion.div>
      </div>

      {/* Racing Cars Animation - Push to bottom */}
      <div className="relative z-10 w-full max-w-lg h-24 md:h-32 flex items-end justify-center gap-8 md:gap-20 pb-4 md:pb-10 shrink-0">
         {/* Silver Car (Salmane) */}
         <motion.div
           animate={{ y: [0, -5, 0, 3, 0] }}
           transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
           className="relative"
         >
            <CarFront className="w-12 h-12 md:w-20 md:h-20 text-gray-300 fill-gray-500 drop-shadow-lg" />
            <div className="absolute -bottom-2 w-full h-3 md:h-4 bg-black/50 blur-md rounded-full" />
            <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-gray-200 text-[8px] md:text-[10px] px-2 py-0.5 rounded font-mono font-bold">HAM</div>
         </motion.div>

         {/* Red Car (Firdaous) */}
         <motion.div
           animate={{ y: [0, 3, 0, -5, 0] }}
           transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
           className="relative"
         >
            <CarFront className="w-12 h-12 md:w-20 md:h-20 text-red-500 fill-red-600 drop-shadow-lg" />
            <div className="absolute -bottom-2 w-full h-3 md:h-4 bg-black/50 blur-md rounded-full" />
            <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 text-[8px] md:text-[10px] px-2 py-0.5 rounded font-mono font-bold">LEC</div>
         </motion.div>
      </div>
      
      {/* Speed lines */}
      <motion.div 
         className="absolute inset-0 pointer-events-none z-10"
         style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)', backgroundSize: '100% 20px' }}
         animate={{ opacity: [0.2, 0.5, 0.2] }}
         transition={{ duration: 0.2, repeat: Infinity }}
      />
    </div>
  );
};

export default Screen12_Racing;
