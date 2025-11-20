
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';

const Screen8_Epilogue: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const script = [
      "B.E.S.T.I.E. System Rebooted.",
      "New Program Initialized: OurStory.exe",
      "Status: Loading Chapter 1...",
      "Final Result: The one I was hoping for, too. ♡"
    ];

    let delay = 1000;
    script.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 2000;
    });
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden p-4">
       {/* Falling snow/hearts effect */}
       <div className="absolute inset-0 pointer-events-none">
         {Array.from({ length: 20 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute text-pink-200"
             initial={{ 
               x: Math.random() * window.innerWidth, 
               y: -20 
             }}
             animate={{ 
               y: window.innerHeight + 20,
               x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`
             }}
             transition={{ 
               duration: Math.random() * 10 + 10, 
               repeat: Infinity, 
               delay: Math.random() * 10,
               ease: "linear"
             }}
           >
             <Heart size={Math.random() * 15 + 5} fill="currentColor" />
           </motion.div>
         ))}
       </div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.5 }}
         className="relative bg-white p-6 md:p-12 rounded-[2rem] shadow-[0_0_40px_rgba(255,182,193,0.5)] max-w-3xl w-full border border-pink-50"
       >
         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="shrink-0">
               <motion.div
                 initial={{ rotateY: 90 }}
                 animate={{ rotateY: 0 }}
                 transition={{ duration: 1, delay: 0.5 }}
               >
                 <BookOpen className="w-24 h-24 md:w-48 md:h-48 text-pink-300" strokeWidth={1} />
               </motion.div>
            </div>
            
            <div className="flex-1 font-mono text-sm md:text-lg space-y-3 md:space-y-4 min-h-[150px] md:min-h-[200px] flex flex-col justify-center w-full">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`${i === 3 ? 'text-pink-600 font-bold text-lg md:text-2xl mt-2 md:mt-4 font-sans' : 'text-gray-500 text-xs md:text-base'}`}
                >
                  {i === 3 ? line : `> ${line}`}
                </motion.div>
              ))}
            </div>
         </div>
       </motion.div>
    </div>
  );
};

export default Screen8_Epilogue;
