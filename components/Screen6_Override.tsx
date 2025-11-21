
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Screen6_Override: React.FC<Props> = ({ onComplete }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const script = [
    "Sooo... I think my robot helper crashed from a cuteness overload.",
    "Guess that's what happens when it tries to process 'Us'.",
    "Before it melted down, it was trying to find the final result.",
    "So, forget the cute, broken robot. Real talk: what result were you hoping for?",
    "Text me your answer... then check my reply for the final secret code. ♡",
    "P.S. The code is 'together'. See you soon! ♡"
  ];

  useEffect(() => {
    let delay = 1000;
    script.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (index === script.length - 1) {
          setTimeout(() => setShowButton(true), 1500);
        }
      }, delay);
      // Add longer pauses for dramatic effect
      delay += index === 3 ? 3000 : (index === 4 ? 2000 : 2000); 
    }, []);

    return () => {}; // Cleanup handled by react in effect
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto bg-white shadow-lg md:rounded-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-3 md:p-4 border-b bg-white flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-100 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-500 fill-pink-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base">Salmane</h3>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-6 bg-pink-50/30">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 md:gap-3"
          >
             <div className="mt-auto mb-0">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-400 fill-pink-100" />
             </div>
             <div className="bg-white p-3 md:p-4 rounded-2xl rounded-bl-none shadow-sm border border-pink-100 max-w-[85%]">
               <p className="text-gray-800 text-base md:text-lg leading-snug">{msg}</p>
             </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Footer Action */}
      {showButton && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 md:p-6 bg-white border-t flex justify-center shrink-0"
        >
          <button 
            onClick={onComplete}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 text-sm md:text-base"
          >
            I have the code <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Screen6_Override;