
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Instagram, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const SECRET_CODE = "SWEATER" ;
const Screen12b_IGLock: React.FC<Props> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === SECRET_CODE) {
      setIsUnlocking(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-pink-50/80 backdrop-blur-sm">
      {/* Dimmed Background Overlay */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="z-10 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 border-4 border-pink-100 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-pink-100 to-transparent opacity-50 pointer-events-none" />

        {/* Lock Icon Animation */}
        <div className="relative mb-8 mt-4">
          <AnimatePresence mode="wait">
            {!isUnlocking ? (
              <motion.div
                key="locked"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative"
              >
                 {/* Heart Shape Background for Lock */}
                 <div className="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-20 animate-pulse" />
                 <Heart className="w-32 h-32 text-pink-500 fill-pink-100 drop-shadow-lg" strokeWidth={1.5} />
                 <Lock className="w-12 h-12 text-pink-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ type: 'spring' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30" />
                <Heart className="w-32 h-32 text-green-500 fill-green-100 drop-shadow-lg" strokeWidth={1.5} />
                <Unlock className="w-12 h-12 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <motion.div 
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-200" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted 🔒</h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
          To open the final page of our story, you need the Secret Key.
        </p>

        {/* Hint Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-pink-200 rounded-xl p-3 mb-6 w-full flex items-center gap-3">
           <div className="bg-white p-2 rounded-full shadow-sm">
             <Instagram className="w-5 h-5 text-pink-600" />
           </div>
           <p className="text-xs md:text-sm text-pink-800 font-medium text-left">
             Hint: Go check Salmane's Instagram Note right now. 🎵
           </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER CODE"
            disabled={isUnlocking}
            className={`
              w-full py-4 px-6 rounded-full bg-gray-50 border-2 outline-none text-center font-bold tracking-[0.2em] text-lg uppercase transition-all
              ${error 
                ? 'border-red-400 text-red-500 bg-red-50 animate-shake placeholder-red-300' 
                : 'border-gray-200 text-gray-800 focus:border-pink-400 focus:ring-4 focus:ring-pink-100'
              }
              ${isUnlocking ? 'border-green-400 text-green-600 bg-green-50' : ''}
            `}
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isUnlocking}
            className={`
              mt-4 w-full py-3.5 rounded-full font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all
              ${isUnlocking 
                ? 'bg-green-500 cursor-default' 
                : 'bg-pink-500 hover:bg-pink-600'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isUnlocking ? (
              <>Unlocking... <Sparkles className="w-5 h-5 animate-spin" /></>
            ) : (
              <>Unlock Page <ArrowRight className="w-5 h-5" /></>
            )}
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
};

export default Screen12b_IGLock;
