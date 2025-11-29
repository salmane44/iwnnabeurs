
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bot, Sparkles, Lock, ArrowRight, Cat, HelpCircle } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

type Phase = 'WELCOME' | 'PLAYBACK' | 'TRANSITION';

interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const Screen0_RecapSequence: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('WELCOME');
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  // Initialize floating hearts with stable random values
  useEffect(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      size: Math.random() * 30 + 10
    }));
    setFloatingHearts(hearts);
  }, []);

  // Playback Logic
  useEffect(() => {
    if (phase === 'PLAYBACK') {
      // Timeline for the memory montage
      const timelines = [
        2500, // Login
        2500, // Puzzles (Cat)
        1500, // Meltdown
        2500, // Cliffhanger chat
        3000, // Secret Lock
        1000, // End of playback, start transition
      ];

      let currentDelay = 0;
      
      timelines.forEach((duration, index) => {
        setTimeout(() => {
          if (index < timelines.length - 1) {
            setMemoryIndex(index + 1);
          } else {
            setPhase('TRANSITION');
          }
        }, currentDelay + duration);
        currentDelay += duration;
      });
    }
  }, [phase]);

  // --- SCENE 1: WELCOME ---
  if (phase === 'WELCOME') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-6 bg-pink-50 overflow-hidden">
        {/* Floating ambient hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingHearts.map((heart) => (
             <motion.div
               key={heart.id}
               className="absolute text-pink-200"
               style={{ left: `${heart.left}%` }}
               initial={{ y: "110vh" }}
               animate={{ y: "-10vh" }}
               transition={{ 
                 duration: heart.duration, 
                 repeat: Infinity, 
                 delay: heart.delay,
                 ease: "linear" 
               }}
             >
               <Heart size={heart.size} fill="currentColor" />
             </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-10 flex flex-col items-center text-center max-w-md w-full bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border-4 border-white shadow-xl"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-4 md:mb-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-pink-100 rounded-full flex items-center justify-center border-4 border-pink-300">
               <Bot className="w-14 h-14 md:w-20 md:h-20 text-pink-500" />
            </div>
            <motion.div 
               className="absolute -top-2 -right-2 bg-yellow-300 p-2 rounded-full"
               animate={{ rotate: [0, 20, -20, 0] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
            >
               <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
            </motion.div>
          </motion.div>

          <h1 className="text-xl md:text-3xl font-bold text-pink-600 mb-3 md:mb-4 font-quicksand">
            Welcome back, Firdaous! ♡
          </h1>
          
          <p className="text-gray-600 mb-2 font-medium text-sm md:text-base">
            B.E.S.T.I.E. System has been rebooted and upgraded to version 2.0!
          </p>
          
          <p className="text-pink-400 text-xs md:text-sm italic mb-6 md:mb-8">
            Before we begin Chapter 2, let's take a moment to remember how our story started...
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('PLAYBACK')}
            className="w-full md:w-auto bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold shadow-lg shadow-pink-200 flex items-center justify-center gap-2 text-base md:text-lg group"
          >
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            Relive the Moment ✨
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // --- SCENE 2: MEMORY PLAYBACK ---
  if (phase === 'PLAYBACK') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden p-4">
        <div className="absolute top-4 right-4 text-pink-300 text-xs md:text-sm font-mono animate-pulse">
          accessing_memory_banks...
        </div>
        
        <AnimatePresence mode="wait">
          {/* Memory 0: The Login */}
          {memoryIndex === 0 && (
            <motion.div 
              key="mem0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center"
            >
               <h2 className="text-pink-600 font-bold mb-4 text-lg md:text-xl">Codename Required</h2>
               <div className="relative w-full max-w-xs">
                  <div className="w-full h-10 md:h-12 border-2 border-pink-300 rounded-full flex items-center px-4 text-pink-500 font-mono text-sm md:text-base">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                      className="overflow-hidden whitespace-nowrap inline-block"
                    >
                      Sleeping Beauty
                    </motion.span>
                    <motion.span 
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ repeat: Infinity, duration: 0.8 }}
                       className="ml-1"
                    >|</motion.span>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -right-2 md:-right-4 top-0"
                  >
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                  </motion.div>
               </div>
            </motion.div>
          )}

          {/* Memory 1: The Cat Puzzle */}
          {memoryIndex === 1 && (
            <motion.div 
              key="mem1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col items-center bg-pink-50 p-4 md:p-6 rounded-xl border-2 border-pink-200 max-w-xs w-full"
            >
               <div className="mb-4 text-center">
                  <Cat className="w-10 h-10 md:w-12 md:h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-xs md:text-sm">Does he hate studying?</p>
               </div>
               <motion.div 
                 initial={{ backgroundColor: "#fff" }}
                 animate={{ backgroundColor: "#dcfce7", scale: 1.1, borderColor: "#4ade80" }}
                 transition={{ delay: 1 }}
                 className="bg-white p-3 rounded-lg border border-gray-200 text-xs md:text-sm font-medium text-green-800 w-full text-center"
               >
                 C) It's his chaotic way of saying 'Good luck!'
               </motion.div>
            </motion.div>
          )}

          {/* Memory 2: The Meltdown */}
          {memoryIndex === 2 && (
            <motion.div 
              key="mem2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-50 flex items-center justify-center p-4"
            >
               <motion.div
                  animate={{ x: [-5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="text-center"
               >
                  <Heart className="w-24 h-24 md:w-32 md:h-32 text-red-500 fill-current mx-auto mb-4" />
                  <h1 className="text-2xl md:text-4xl font-bold text-red-600 glitch-text">CUTENESS OVERLOAD!</h1>
               </motion.div>
               <motion.div className="absolute inset-0 pointer-events-none">
                  {Array.from({length: 20}).map((_,i) => (
                     <motion.div 
                        key={i} 
                        className="absolute text-red-400"
                        initial={{ x: "50%", y: "50%" }}
                        animate={{ 
                           x: `${Math.random() * 100}%`, 
                           y: `${Math.random() * 100}%`,
                           scale: [1, 0]
                        }}
                        transition={{ duration: 1 }}
                     >
                        <Heart size={20} fill="currentColor"/>
                     </motion.div>
                  ))}
               </motion.div>
            </motion.div>
          )}

          {/* Memory 3: The Chat Cliffhanger */}
          {memoryIndex === 3 && (
             <motion.div 
                key="mem3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-pink-100 max-w-xs w-full"
             >
                <div className="flex gap-3 items-end">
                   <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-pink-500 fill-current" />
                   </div>
                   <div className="bg-pink-50 p-3 md:p-4 rounded-2xl rounded-bl-none">
                      <p className="text-gray-800 font-medium text-sm md:text-base">Real talk: what result were you hoping for?</p>
                   </div>
                </div>
             </motion.div>
          )}

          {/* Memory 4: The Secret Lock */}
          {memoryIndex === 4 && (
             <motion.div 
                key="mem4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
             >
                <Lock className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mb-4 md:mb-6" />
                <div className="text-xl md:text-2xl font-bold tracking-[0.3em] md:tracking-[0.5em] text-pink-600 mb-4">
                   <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.2 }}
                   >
                      {'together'.split('').map((char, i) => (
                         <motion.span 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                         >
                            {char}
                         </motion.span>
                      ))}
                   </motion.span>
                </div>
                <motion.div
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: 2, duration: 0.5 }}
                   className="h-1 bg-green-400 rounded-full"
                />
                <motion.div
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1.5 }}
                   transition={{ delay: 2.5 }}
                >
                   <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-green-400 mt-4" />
                </motion.div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- SCENE 3: TRANSITION TO PENDING STATE ---
  if (phase === 'TRANSITION') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex flex-col items-center justify-center bg-pink-50 p-4 relative"
      >
        {/* Floating ambient hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingHearts.slice(0, 5).map((heart) => (
             <motion.div
               key={heart.id}
               className="absolute text-pink-200"
               style={{ left: `${heart.left}%` }}
               initial={{ y: "110vh" }}
               animate={{ y: "-10vh" }}
               transition={{ 
                 duration: heart.duration * 1.5, 
                 repeat: Infinity, 
                 delay: heart.delay,
                 ease: "linear" 
               }}
             >
               <Heart size={heart.size} fill="currentColor" />
             </motion.div>
          ))}
        </div>

        {/* Book Container */}
        <motion.div 
          className="relative w-full max-w-xl aspect-[3/2] perspective-1000 mb-6 md:mb-8 z-10"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 flex shadow-2xl rounded-lg overflow-hidden bg-[#fffaf0] border-4 border-pink-200">
            {/* Left Page - Previous Context */}
            <div className="w-1/2 h-full border-r border-pink-100 p-2 md:p-6 flex flex-col justify-center items-center text-center relative">
               <div className="absolute left-2 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none" />
               <div className="text-pink-300 font-serif italic text-[10px] md:text-sm leading-relaxed select-none opacity-60">
                 <p className="mb-1 md:mb-2">Chapter 1...</p>
                 <p className="mb-1 md:mb-2">The system crashed...</p>
                 <p className="mb-1 md:mb-2">Love overflow...</p>
                 <p className="mb-2 md:mb-4">The secret code was found...</p>
                 <p className="text-[8px] md:text-[10px]">End of log.</p>
               </div>
            </div>
            
            {/* Right Page - The Pending State */}
            <div className="w-1/2 h-full p-2 md:p-6 flex flex-col justify-center items-center text-center relative">
               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none" />
               
               <motion.div
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5, type: "spring" }}
                 className="mb-2 md:mb-4 relative"
               >
                 <motion.div
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <HelpCircle className="w-10 h-10 md:w-16 md:h-16 text-pink-400" strokeWidth={2.5} />
                 </motion.div>
                 <motion.div
                   className="absolute top-0 right-0"
                   animate={{ rotate: [0, 20, 0] }}
                   transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                 >
                    <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
                 </motion.div>
               </motion.div>

               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 }}
                 className="font-mono text-pink-500 text-xs md:text-base font-bold"
               >
                 Status: Loading Chapter 1...
               </motion.p>
            </div>
          </div>
        </motion.div>

        {/* System Message & Button */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 2 }}
           className="text-center z-10 max-w-lg w-full"
        >
           <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-3xl border-2 border-pink-200 shadow-lg mb-4 md:mb-6">
              <p className="text-pink-600 font-medium mb-2 font-quicksand text-sm md:text-base">
                System analysis complete. Chapter 1 is still... pending.
              </p>
              <p className="text-gray-600 text-xs md:text-sm">
                Your story is waiting for its next word. Are you ready to write it together?
              </p>
           </div>

           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={onComplete}
             className="bg-pink-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold shadow-xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2 mx-auto group w-full md:w-auto text-sm md:text-base"
           >
             <span>Continue the Story</span>
             <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:animate-pulse" />
           </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return null;
};

export default Screen0_RecapSequence;
