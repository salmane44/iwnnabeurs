import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen5_Meltdown: React.FC<Props> = ({ onComplete }) => {
  const [intensity, setIntensity] = useState(0);
  const [text, setText] = useState("Final analysis... in... progress...");

  useEffect(() => {
    // Timeline of chaos
    const t1 = setTimeout(() => {
      setIntensity(1);
      setText("Friendship level... is over 9000! ♡");
    }, 2000);

    const t2 = setTimeout(() => {
      setIntensity(2);
      setText("Detecting... a hidden file... named 'Crush.exe'...");
    }, 4500);

    const t3 = setTimeout(() => {
      setIntensity(3);
      setText("Wait! My circuits can't handle this much... FEELING!");
    }, 7000);

    const t4 = setTimeout(() => {
      setIntensity(4);
      setText("CUTENESS OVERLOAD! SYSTEM... MELTING... DOWN... ♡ ✨");
    }, 9500);

    const t5 = setTimeout(() => {
      setIntensity(5); // Whiteout
    }, 12000);

    const t6 = setTimeout(() => {
      onComplete();
    }, 14000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, [onComplete]);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background Chaos */}
      {intensity >= 1 && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: intensity * 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100 
              }}
              animate={{ 
                y: -100,
                rotate: 360
              }}
              transition={{ 
                duration: Math.random() * 2 + 1, 
                repeat: Infinity, 
                delay: Math.random() 
              }}
            >
              <Heart size={Math.random() * 30 + 10} fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Text Content */}
      <motion.div 
        className="z-20 text-center p-6 max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-red-300"
        animate={{ 
          x: intensity >= 2 ? [0, -5, 5, -5, 5, 0] : 0,
          scale: intensity >= 3 ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.2, repeat: intensity >= 2 ? Infinity : 0 }}
      >
        {intensity < 4 && <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />}
        <h1 className={`font-bold text-pink-600 transition-all duration-300 ${intensity >= 3 ? 'text-4xl glitch-text' : 'text-2xl'}`}>
          {text}
        </h1>
      </motion.div>

      {/* The Whiteout Fade */}
      {intensity === 5 && (
        <motion.div 
          className="absolute inset-0 bg-white z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Heart className="w-32 h-32 text-pink-500 fill-current" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Screen5_Meltdown;
