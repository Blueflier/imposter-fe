import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { LandingView } from './components/LandingView';
import { WaitingRoom } from './components/WaitingRoom';
import { GameScreen } from './components/GameScreen';
import type { GameState } from './types/game';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    status: 'waiting',
    players: [],
  });
  const [playerId, setPlayerId] = useState<string>('');

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL); // Using environment variable
    setSocket(newSocket);

    newSocket.on('gameState', (state: GameState) => {
      setGameState(state);
    });

    newSocket.on('playerId', (id: string) => {
      setPlayerId(id);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleJoin = (username: string) => {
    socket?.emit('join', { username });
  };

  const handleStartGame = () => {
    socket?.emit('startGame');
  };

  const handleNextRound = () => {
    socket?.emit('nextRound');
  };

  const isHost = gameState.players.find(p => p.id === playerId)?.isHost || false;

  if (!playerId) {
    return <LandingView onJoin={handleJoin} />;
  }

  if (gameState.status === 'waiting') {
    return (
      <WaitingRoom
        players={gameState.players}
        isHost={isHost}
        onStartGame={handleStartGame}
      />
    );
  }

  if (gameState.status === 'playing' && gameState.subject && gameState.message !== undefined) {
    return (
      <GameScreen
        subject={gameState.subject}
        message={gameState.message}
        isImposter={gameState.isImposter || false}
        isHost={isHost}
        onNextRound={handleNextRound}
      />
    );
  }

  return null;
}

export default App;