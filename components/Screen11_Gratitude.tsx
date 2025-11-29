
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Star, Heart } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen11_Gratitude: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setTimeout(onComplete, 1500);
  };

  const options = [
    { emoji: "🙂", text: "To tell him I notice everything." },
    { emoji: "❤️‍🩹", text: "Because his care makes me feel safe." },
    { emoji: "🌟", text: "Because he is the best part of my day." }
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Split Background */}
      <div className="absolute inset-0 flex pointer-events-none">
         <div className="w-1/2 h-full bg-gradient-to-b from-orange-100 to-rose-100 flex items-start justify-center pt-10 md:pt-20">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="opacity-50"
            >
               <Sun className="w-20 h-20 md:w-32 md:h-32 text-orange-400/50" />
            </motion.div>
         </div>
         <div className="w-1/2 h-full bg-gradient-to-b from-indigo-900 to-purple-900 flex items-start justify-center pt-10 md:pt-20">
            <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="opacity-50 relative"
            >
               <Moon className="w-16 h-16 md:w-24 md:h-24 text-indigo-200/50" />
               <Star className="w-4 h-4 md:w-6 md:h-6 text-white absolute top-0 -right-4 animate-pulse" />
               <Star className="w-3 h-3 md:w-4 md:h-4 text-white absolute bottom-2 -left-2 animate-pulse delay-75" />
            </motion.div>
         </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-lg"
      >
        {/* Chat Bubble Recreation */}
        <div className="flex justify-end mb-6 md:mb-8">
           <div className="bg-[#007AFF] text-white p-3 md:p-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-lg relative">
              <p className="text-xs md:text-lg leading-snug">
                Tyyy smm for wishing me gn and gm even tho i dont reply❤❤
              </p>
              <div className="text-[9px] md:text-[10px] text-blue-100 text-right mt-1 opacity-80">Read 10:42 PM</div>
              {/* Tail */}
              <div className="absolute top-0 -right-2 w-3 h-3 md:w-4 md:h-4 bg-[#007AFF]" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}></div>
           </div>
        </div>

        {/* Analysis Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 md:p-8 shadow-2xl border border-white/50">
           <div className="text-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-black mb-2 font-serif">Deep Analysis: The Quiet Moments</h2>
              <p className="text-black text-xs md:text-base leading-relaxed font-medium">
                Even when exams stress you out, or phones get taken away... Salmane always sends his care.
                And you, in your own sweet way, noticed.
              </p>
           </div>
           
           <h3 className="text-black font-semibold text-center mb-4 text-sm md:text-base">That message meant the world to him. Why did you send it?</h3>

           <div className="space-y-3">
              {options.map((opt, i) => (
                 <motion.button
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleSelect(i)}
                   className={`
                      w-full p-3 md:p-4 rounded-xl border flex items-center gap-3 transition-all
                      ${selected === i
                        ? 'bg-pink-100 border-pink-400 text-pink-900 shadow-inner'
                        : 'bg-white border-gray-200 hover:border-pink-300 hover:shadow-md text-black'
                      }
                   `}
                 >
                    <span className="text-lg md:text-xl">{opt.emoji}</span>
                    <span className="text-xs md:text-base font-medium text-left">{opt.text}</span>
                    {selected === i && <Heart className="ml-auto w-4 h-4 text-pink-500 fill-current" />}
                 </motion.button>
              ))}
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Screen11_Gratitude;
