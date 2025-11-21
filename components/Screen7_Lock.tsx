
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Key, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen7_Lock: React.FC<Props> = ({ onComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check for the secret code "Together"
    if (cleanCode === 'together') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full w-full max-w-xl mx-auto p-4 md:p-6 z-10 relative"
    >
      <div className="text-center mb-6 md:mb-8">
         <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="relative inline-block"
         >
            <Lock className="w-24 h-24 md:w-32 md:h-32 text-pink-400 fill-pink-100" />
            <motion.div 
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
            </motion.div>
         </motion.div>
         
         <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-medium text-pink-600 mt-4 md:mt-6"
         >
            System rebooting...
         </motion.h2>
         <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-base text-pink-400 mt-2"
         >
            Awaiting final key to initialize.
         </motion.p>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        className="w-full relative max-w-sm flex flex-col gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="relative group w-full">
          <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-pink-500 transition-colors" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Secret Code"
            className={`w-full pl-12 pr-4 py-3 md:py-4 rounded-full border-2 outline-none focus:ring-4 transition-all duration-300 text-center tracking-widest text-base md:text-lg ${
              error 
                ? 'border-red-400 bg-red-50 focus:ring-red-200 animate-shake text-red-500 placeholder-red-300' 
                : 'border-pink-300 bg-pink-50 text-pink-600 placeholder-pink-300 focus:border-pink-500 focus:ring-pink-200'
            }`}
          />
        </div>
        
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 md:py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-all text-sm md:text-base"
        >
            Unlock System <ArrowRight className="w-5 h-5" />
        </motion.button>

        {error && (
          <p className="text-red-400 text-xs md:text-sm text-center">
            Incorrect Key. Please check your messages.
          </p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Screen7_Lock;
