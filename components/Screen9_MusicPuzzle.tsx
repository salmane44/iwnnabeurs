
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart, Play, Pause, SkipBack, SkipForward, AudioWaveform } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

// Placeholder link - In production, replace this string with the actual URL to the mp3
const SONG_URL = "https://chilly-olive-ddragh82xn-dnsbtz4qrj.edgeone.dev/audio-editor-output.mp3"; 

const Screen9_MusicPuzzle: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio object
    audioRef.current = new Audio(SONG_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio playback failed (interaction required)", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Stage 0: Initial Welcome
    const t1 = setTimeout(() => {
      setStage(1);
    }, 4000);

    return () => {
      clearTimeout(t1);
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Move to stage 2 (Question) shortly after playing music if not already there
    if (stage < 2) {
      setTimeout(() => setStage(2), 3000);
    }
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const options = [
    { icon: "😳", text: "I'm a little shy about it, but yes." },
    { icon: "✨", text: "Yes, I'm proud of my heart." },
    { icon: "🤫", text: "That's for me to know..." }
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Floating Musical Notes Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50,
              opacity: 0 
            }}
            animate={{ 
              y: -50,
              opacity: [0, 1, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear" 
            }}
          >
            <Music size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Intro Text */}
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10 text-center bg-white/80 backdrop-blur-md p-6 rounded-3xl border-2 border-pink-200 shadow-lg max-w-md w-full mb-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-500 font-bold">
               <Heart className="w-5 h-5 fill-current" />
               <span>Welcome Back</span>
            </div>
            <p className="text-gray-700 leading-relaxed font-quicksand text-sm md:text-base">
              Chapter 1 was about the jokes. This chapter is about <b>you</b>.
              <br/><br/>
              My sensors detected a powerful signal when you shared this song.
              It takes a brave and beautiful heart to feel things that deeply.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player UI */}
      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className={`
            relative bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-4 border-pink-100 w-full max-w-xs overflow-hidden transition-all duration-500 z-20 shrink-0
            ${stage >= 2 ? 'scale-90 md:scale-100' : ''}
          `}
        >
          {/* Album Art Area */}
          <div className="bg-gradient-to-br from-indigo-200 to-pink-200 h-40 md:h-48 relative flex items-center justify-center overflow-hidden">
             {/* Rotating Vinyl Effect */}
             <motion.div 
               className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-black/80 bg-black flex items-center justify-center shadow-lg"
               animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-400 rounded-full border-2 border-white flex items-center justify-center">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                </div>
             </motion.div>

             {/* Visualizer bars */}
             <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 flex items-end justify-center gap-1 pb-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 md:w-1.5 bg-white/80 rounded-t-full"
                    animate={isPlaying ? { height: [5, 20 + Math.random() * 30, 5] } : { height: 5 }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
             </div>
          </div>

          {/* Player Controls & Info */}
          <div className="p-5 md:p-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Can't Resist</h2>
                <p className="text-pink-500 text-xs md:text-sm font-medium">The Secret Whispers</p>
              </div>
              <AudioWaveform className={`w-5 h-5 md:w-6 md:h-6 ${isPlaying ? 'text-pink-500 animate-pulse' : 'text-gray-300'}`} />
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full mb-4 md:mb-6 overflow-hidden">
              <motion.div 
                className="h-full bg-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={isPlaying ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 text-gray-400">
              <SkipBack className="w-5 h-5 md:w-6 md:h-6 hover:text-pink-400 cursor-pointer" />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                className="w-12 h-12 md:w-14 md:h-14 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-200 hover:bg-pink-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 md:w-6 md:h-6 fill-current" /> : <Play className="w-5 h-5 md:w-6 md:h-6 fill-current ml-1" />}
              </motion.button>
              <SkipForward className="w-5 h-5 md:w-6 md:h-6 hover:text-pink-400 cursor-pointer" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Interaction Phase */}
      {stage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mt-4 md:mt-6 z-20"
        >
          <div className="text-center mb-4 bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-white">
             <p className="text-pink-600 font-bold text-sm md:text-lg">
               Be honest... Is this passionate side of you something you're proud of?
             </p>
          </div>

          <div className="flex flex-col gap-3">
             {options.map((opt, idx) => (
               <motion.button
                 key={idx}
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: idx * 0.2 }}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => handleOptionClick(idx)}
                 className={`
                   relative p-3 md:p-4 rounded-2xl text-left flex items-center gap-4 border-2 transition-all shadow-sm
                   ${selectedOption === idx 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 border-pink-500 text-white' 
                      : 'bg-white border-pink-100 hover:border-pink-300 text-gray-700'
                   }
                   ${selectedOption !== null && selectedOption !== idx ? 'opacity-50 blur-[1px]' : ''}
                 `}
               >
                  <span className="text-xl md:text-2xl filter drop-shadow-sm">{opt.icon}</span>
                  <span className="font-medium text-xs md:text-base">{opt.text}</span>
                  {selectedOption === idx && (
                    <motion.div 
                       initial={{ scale: 0 }} 
                       animate={{ scale: 1 }}
                       className="absolute right-4"
                    >
                      <Heart className="w-5 h-5 fill-current text-white" />
                    </motion.div>
                  )}
               </motion.button>
             ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Screen9_MusicPuzzle;
