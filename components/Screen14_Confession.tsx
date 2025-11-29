
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';

const INSTAGRAM_URL = "https://ig.me/m/s4lmverse";

const Screen14_Confession: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleYes = () => {
    // Confetti Explosion
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });

    setShowToast(true);

    // Redirect after delay
    setTimeout(() => {
      window.location.href = INSTAGRAM_URL;
    }, 2000);
  };

  const handleTellMore = () => {
    window.location.href = INSTAGRAM_URL;
  };

  return (
    <div className="w-full h-full bg-white relative flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto md:overflow-hidden">
       {/* Central Beating Heart */}
       <motion.div
         animate={{ scale: [1, 1.1, 1] }}
         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
         className="mb-6 md:mb-12 shrink-0"
       >
          <div className="relative">
             <Heart className="w-24 h-24 md:w-48 md:h-48 text-pink-500 fill-pink-500 drop-shadow-2xl" strokeWidth={0} />
             <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-20 rounded-full" />
          </div>
       </motion.div>

       {/* Message Container */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1 }}
         className="max-w-xl text-center space-y-4 md:space-y-6 mb-8 md:mb-12"
       >
          <p className="text-gray-600 text-base md:text-xl font-medium leading-relaxed px-4">
            "Since I can't give you my sweater across the miles yet..."
          </p>
          <p className="text-gray-800 text-base md:text-2xl font-bold leading-relaxed px-4">
            "I'm giving you my heart instead."
          </p>
          <p className="text-gray-600 text-base md:text-xl font-medium leading-relaxed px-4">
             "I want to be your Team Mate, your 3 AM comfort, and the person who keeps you warm."
          </p>
          <h1 className="text-xl md:text-3xl font-bold text-pink-600 pt-4 font-quicksand">
            Firdaous, will you start this new chapter with me?
          </h1>
       </motion.div>

       {/* Actions */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-md shrink-0"
       >
          <button 
            onClick={handleYes}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl shadow-pink-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span>Yes, let's turn the page.</span>
            <Heart className="w-4 h-4 md:w-5 md:h-5 fill-white" />
          </button>
          
          <button 
            onClick={handleTellMore}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border-2 border-gray-200 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            <span>Tell me more...</span>
          </button>
       </motion.div>

       {/* Toast Notification */}
       <AnimatePresence>
         {showToast && (
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0 }}
             className="fixed bottom-10 bg-black/80 backdrop-blur text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50 text-sm md:text-base"
           >
             <span>💌</span>
             <span className="font-medium">I knew it! Go tell him! Redirecting...</span>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export default Screen14_Confession;
