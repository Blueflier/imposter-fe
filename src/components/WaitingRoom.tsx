import React from 'react';
import { Users, Play } from 'lucide-react';
import type { Player } from '../types/game';

interface WaitingRoomProps {
  players: Player[];
  isHost: boolean;
  onStartGame: () => void;
}

export function WaitingRoom({ players, isHost, onStartGame }: WaitingRoomProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waiting Room</h2>
          <div className="w-full">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Players ({players.length})
              </h3>
              <ul className="space-y-2">
                {players.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span className="text-gray-800">{player.username}</span>
                    {player.isHost && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        Host
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {isHost && (
              <button
                onClick={onStartGame}
                disabled={players.length < 3}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-white transition-colors duration-200
                  ${
                    players.length < 3
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                <Play className="w-5 h-5" />
                <span>Start Game</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}