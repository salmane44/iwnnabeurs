import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Cat, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onComplete: () => void;
}

const Screen2_Cat: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent double clicks
    setSelected(option);

    if (option === 'C') {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbcfe8', '#f472b6', '#fce7f3']
      });
      setTimeout(onComplete, 2000);
    }
  };

  const options = [
    { id: 'A', text: "It means he actually thinks studying is a joke." },
    { id: 'B', text: "It's a glitch in the Matrix." },
    { id: 'C', text: "It's his chaotic way of saying 'Good luck, don't die!'" }, // Correct
    { id: 'D', text: "He is secretly a cat." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto p-6 z-10 relative"
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full border-4 border-pink-100">
        <div className="flex items-center justify-between mb-6 border-b-2 border-pink-50 pb-4">
          <h2 className="text-2xl font-bold text-pink-600">Module 1: The Weird Cat Protocol</h2>
          <HelpCircle className="text-pink-400 w-8 h-8" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
          <div className="bg-pink-50 p-4 rounded-2xl border-2 border-pink-200 transform rotate-3 shadow-md">
            {/* Hand-drawn style cat placeholder */}
            <div className="w-32 h-32 flex items-center justify-center bg-white rounded-xl relative overflow-hidden">
               <Cat className="w-20 h-20 text-gray-400" />
               <div className="absolute top-2 right-2 text-xl">😹</div>
            </div>
            <p className="text-center text-xs text-pink-400 mt-2 font-mono">sticker_sent.png</p>
          </div>
          
          <div className="flex-1">
            <div className="bg-pink-50 p-4 rounded-xl rounded-tl-none mb-2 relative">
              <p className="text-pink-800 font-medium">
                System Query: When you say you have to study, Salmane sends this sticker. 
                My emotional sensors are confused. Is he laughing AT you? What does it mean?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(opt.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                selected === opt.id 
                  ? opt.id === 'C' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
                  : 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                   selected === opt.id ? (opt.id === 'C' ? 'bg-green-400' : 'bg-red-400') : 'bg-pink-300 group-hover:bg-pink-400'
                }`}>
                  {opt.id}
                </div>
                <span className={`text-sm md:text-base font-medium ${selected === opt.id ? 'text-gray-800' : 'text-gray-600'}`}>
                  {opt.text}
                </span>
                {selected === opt.id && opt.id === 'C' && (
                   <CheckCircle2 className="ml-auto text-green-500 w-6 h-6" />
                )}
              </div>
              {/* Hover sparkle effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-white opacity-0 group-hover:opacity-30 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Screen2_Cat;
