import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Lock } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen1_BootUp: React.FC<Props> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === 'sleeping beauty') {
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
      className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto p-6 text-center z-10 relative"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: 'spring' }}
        className="mb-8 relative"
      >
        <Heart className="w-32 h-32 text-pink-400 fill-pink-200" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-40 h-40 border-4 border-dashed border-pink-300 rounded-full opacity-50" />
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-3xl font-bold text-pink-600 mb-4 drop-shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        B.E.S.T.I.E. Analysis Engine <Sparkles className="inline w-6 h-6 text-yellow-400" />
      </motion.h1>

      <motion.div 
        className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border-2 border-pink-200 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-pink-500 font-medium mb-2">Analyzing Friendship Data: Salmane & Firdaous...</p>
        <p className="text-gray-600 text-sm italic">Oh my! This data is... a little wild! My circuits are sparkling! ✨</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-md relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <label className="block text-pink-600 font-semibold mb-2">
          Enter Super-Secret Codename:
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Who are you?"
            className={`w-full pl-12 pr-4 py-4 rounded-full border-2 outline-none focus:ring-4 transition-all duration-300 ${
              error 
                ? 'border-red-400 bg-red-50 focus:ring-red-200 animate-shake' 
                : 'border-pink-300 bg-pink-50 text-pink-600 placeholder-pink-300 focus:border-pink-500 focus:ring-pink-200'
            }`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-400 text-sm mt-2"
          >
            Access Denied! That's not the secret name! Hint: Disney Princess 😴
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Screen1_BootUp;