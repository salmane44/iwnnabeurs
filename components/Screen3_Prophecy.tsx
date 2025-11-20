import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';
import { checkProphecyMeaning } from '../services/geminiService';

interface Props {
  onComplete: () => void;
}

const Screen3_Prophecy: React.FC<Props> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsChecking(true);
    const isCorrect = await checkProphecyMeaning(input);
    setIsChecking(false);

    if (isCorrect) {
      setFeedback("Ah! That makes sense! Updating database... ♡");
      setTimeout(onComplete, 2000);
    } else {
      setFeedback("Hmm, my calculations say that doesn't fit the pattern. Try again! (Hint: School work?)");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col h-full w-full max-w-2xl mx-auto p-4 z-10"
    >
      <div className="flex-1 bg-white/90 backdrop-blur rounded-3xl shadow-lg border border-pink-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-pink-100 p-4 flex items-center gap-3 border-b border-pink-200">
          <div className="relative">
             <Bot className="w-10 h-10 text-pink-600" />
             <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             >
                <Sparkles className="w-4 h-4 text-yellow-400" />
             </motion.div>
          </div>
          <div>
            <h3 className="font-bold text-pink-700">B.E.S.T.I.E. Bot</h3>
            <p className="text-xs text-pink-500">Status: Confused & Dizzy</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex gap-3"
           >
             <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center shrink-0">🤖</div>
             <div className="bg-pink-50 p-3 rounded-2xl rounded-tl-none border border-pink-100 text-sm md:text-base text-gray-700 shadow-sm">
               <p className="mb-2">Help! I found a message that I think is a secret, dramatic prophecy!</p>
               <p className="font-mono bg-white p-2 rounded border border-pink-200 text-pink-600 font-bold text-center my-2">
                 "lihela yewerik sheni taba3eni"
               </p>
               <p>I'm pretty sure that means <span className="font-bold text-red-400">"A great darkness is coming!"</span> Am I right?! What did you actually mean?</p>
             </div>
           </motion.div>

           {feedback && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-sm font-medium p-2 rounded-lg ${feedback.includes('Ah!') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
             >
               {feedback}
             </motion.div>
           )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Translate the prophecy..."
              disabled={isChecking || (feedback !== null && feedback.includes('Ah!'))}
              className="w-full pl-4 pr-12 py-3 rounded-full border-2 border-pink-200 bg-pink-50 text-pink-700 placeholder-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isChecking || !input.trim()}
              className="absolute right-2 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 disabled:bg-pink-300 transition-colors shadow-md"
            >
              {isChecking ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <Send className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Screen3_Prophecy;