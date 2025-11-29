
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Snowflake } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen13_Winter: React.FC<Props> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const script = [
      "System Analysis Complete.",
      "We have reviewed the laughter, the music, the teasing, and the silence.",
      "Today is December 3rd.",
      "The day of the Sweater.",
      "The day we give warmth to the person we cherish the most."
    ];

    let delay = 1000;
    script.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      // Increase delay for the final lines for dramatic effect
      delay += (i >= 2 ? 3000 : 2000);
    });

    // Auto proceed after reading
    setTimeout(onComplete, 16000);
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-[#0F172A] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      {/* Cozy Knitted Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
                            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
        }}
      />

      {/* Falling Snow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/80"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              opacity: Math.random() 
            }}
            animate={{ 
              y: window.innerHeight + 20,
              x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Snowflake size={Math.random() * 10 + 5} />
          </motion.div>
        ))}
      </div>

      {/* Moon/Warmth Glow */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-orange-100/10 rounded-full blur-3xl" />

      {/* Text Container */}
      <div className="z-10 max-w-2xl space-y-6">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            className={`
              font-quicksand
              ${i === 2 || i === 3 ? 'text-3xl md:text-5xl font-bold text-blue-200 py-2' : 'text-blue-100/80 text-lg md:text-xl font-medium'}
              ${i >= 4 ? 'italic text-pink-200' : ''}
            `}
          >
            {line}
          </motion.p>
        ))}
      </div>
      
      {/* Continue hint if they read faster */}
      {lines.length === 5 && (
         <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            onClick={onComplete}
            className="absolute bottom-10 text-blue-300 text-sm animate-pulse hover:text-white transition-colors"
         >
            Tap to feel the warmth...
         </motion.button>
      )}
    </div>
  );
};

export default Screen13_Winter;
