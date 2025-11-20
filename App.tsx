
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameState } from './types';
import Background from './components/Background';

import Screen1_BootUp from './components/Screen1_BootUp';
import Screen2_Cat from './components/Screen2_Cat';
import Screen3_Prophecy from './components/Screen3_Prophecy';
import Screen4_Snack from './components/Screen4_Snack';
import Screen5_Meltdown from './components/Screen5_Meltdown';
import Screen6_Override from './components/Screen6_Override';
import Screen7_Lock from './components/Screen7_Lock';
import Screen8_Epilogue from './components/Screen8_Epilogue';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.BOOT_UP);

  // Helper to advance state
  const nextState = (next: GameState) => {
    setGameState(next);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-pink-50">
      {/* Global ambient background for kawaii vibes */}
      {/* We might want to disable standard particles for the final specific aesthetic screens if needed, 
          but a subtle background is nice everywhere. Screen 8 handles its own snow. */}
      {gameState !== GameState.MANUAL_OVERRIDE && gameState !== GameState.EPILOGUE && <Background />}

      <div className="relative z-10 w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
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
