
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameState } from './types';
import Background from './components/Background';

import Screen0_RecapSequence from './components/Screen0_RecapSequence';
import Screen1_BootUp from './components/Screen1_BootUp';
import Screen2_Cat from './components/Screen2_Cat';
import Screen3_Prophecy from './components/Screen3_Prophecy';
import Screen4_Snack from './components/Screen4_Snack';
import Screen5_Meltdown from './components/Screen5_Meltdown';
import Screen6_Override from './components/Screen6_Override';
import Screen7_Lock from './components/Screen7_Lock';
import Screen8_Epilogue from './components/Screen8_Epilogue';
import Screen9_MusicPuzzle from './components/Screen9_MusicPuzzle';
import Screen10_Personality from './components/Screen10_Personality';
import Screen11_Gratitude from './components/Screen11_Gratitude';
import Screen12_Racing from './components/Screen12_Racing';
import Screen13_Winter from './components/Screen13_Winter';
import Screen14_Confession from './components/Screen14_Confession';

const App: React.FC = () => {
  // Start with the Recap sequence
  const [gameState, setGameState] = useState<GameState>(GameState.RECAP);

  // Helper to advance state
  const nextState = (next: GameState) => {
    setGameState(next);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-pink-50">
      {/* Global ambient background for kawaii vibes */}
      {/* We hide the default background for specific screens that have their own immersive backgrounds */}
      {gameState !== GameState.MANUAL_OVERRIDE && 
       gameState !== GameState.EPILOGUE && 
       gameState !== GameState.RECAP && 
       gameState !== GameState.CHAPTER_2_GRATITUDE &&
       gameState !== GameState.CHAPTER_2_DEC1 &&
       <Background />}

      <div className="relative z-10 w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          {/* New Recap Sequence */}
          {gameState === GameState.RECAP && (
            <Screen0_RecapSequence key="recap" onComplete={() => nextState(GameState.CHAPTER_2_MUSIC)} />
          )}

          {/* --- CHAPTER 2 ARC --- */}

          {/* Level 1: Music */}
          {gameState === GameState.CHAPTER_2_MUSIC && (
             <Screen9_MusicPuzzle key="music" onComplete={() => nextState(GameState.CHAPTER_2_PERSONALITY)} />
          )}

          {/* Level 2: Personality */}
          {gameState === GameState.CHAPTER_2_PERSONALITY && (
            <Screen10_Personality key="personality" onComplete={() => nextState(GameState.CHAPTER_2_GRATITUDE)} />
          )}

          {/* Level 3: Gratitude */}
          {gameState === GameState.CHAPTER_2_GRATITUDE && (
            <Screen11_Gratitude key="gratitude" onComplete={() => nextState(GameState.CHAPTER_2_RACING)} />
          )}

          {/* Level 4: Racing */}
          {gameState === GameState.CHAPTER_2_RACING && (
            <Screen12_Racing key="racing" onComplete={() => nextState(GameState.CHAPTER_2_DEC1)} />
          )}

          {/* Transition: December 1st */}
          {gameState === GameState.CHAPTER_2_DEC1 && (
            <Screen13_Winter key="winter" onComplete={() => nextState(GameState.CHAPTER_2_CONFESSION)} />
          )}

          {/* Final: Confession */}
          {gameState === GameState.CHAPTER_2_CONFESSION && (
            <Screen14_Confession key="confession" />
          )}


          {/* --- LEGACY CHAPTER 1 ARC (Preserved but currently bypassed) --- */}
          {gameState === GameState.BOOT_UP && (
            <Screen1_BootUp key="1" onComplete={() => nextState(GameState.MODULE_CAT)} />
          )}
          
          {gameState === GameState.MODULE_CAT && (
            <Screen2_Cat key="2" onComplete={() => nextState(GameState.MODULE_PROPHECY)} />
          )}
          
          {gameState === GameState.MODULE_PROPHECY && (
            <Screen3_Prophecy key="3" onComplete={() => nextState(GameState.MODULE_SNACK)} />
          )}
          
          {gameState === GameState.MODULE_SNACK && (
            <Screen4_Snack key="4" onComplete={() => nextState(GameState.MELTDOWN)} />
          )}
          
          {gameState === GameState.MELTDOWN && (
            <Screen5_Meltdown key="5" onComplete={() => nextState(GameState.MANUAL_OVERRIDE)} />
          )}
          
          {gameState === GameState.MANUAL_OVERRIDE && (
            <Screen6_Override key="6" onComplete={() => nextState(GameState.FINAL_LOCK)} />
          )}

          {gameState === GameState.FINAL_LOCK && (
            <Screen7_Lock key="7" onComplete={() => nextState(GameState.EPILOGUE)} />
          )}

          {gameState === GameState.EPILOGUE && (
             <Screen8_Epilogue key="8" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;