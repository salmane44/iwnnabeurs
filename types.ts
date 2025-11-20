
export enum GameState {
  BOOT_UP = 'BOOT_UP',
  MODULE_CAT = 'MODULE_CAT',
  MODULE_PROPHECY = 'MODULE_PROPHECY',
  MODULE_SNACK = 'MODULE_SNACK',
  MELTDOWN = 'MELTDOWN',
  MANUAL_OVERRIDE = 'MANUAL_OVERRIDE',
  FINAL_LOCK = 'FINAL_LOCK',
  EPILOGUE = 'EPILOGUE',
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}
