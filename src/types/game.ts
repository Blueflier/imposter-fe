export interface Player {
  id: string;
  username: string;
  isHost: boolean;
}

export interface GameState {
  status: 'waiting' | 'playing' | 'finished';
  players: Player[];
  subject?: string;
  message?: string;
  isImposter?: boolean;
}