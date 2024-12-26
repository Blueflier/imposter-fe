import React from 'react';
import { AlertCircle } from 'lucide-react';

interface GameScreenProps {
  subject: string;
  message: string;
  isImposter: boolean;
}

export function GameScreen({ subject, message, isImposter }: GameScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-full mb-6 ${isImposter ? 'bg-red-100' : 'bg-green-100'}`}>
            <AlertCircle className={`w-12 h-12 ${isImposter ? 'text-red-600' : 'text-green-600'}`} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject</h2>
          <p className="text-xl text-gray-700 mb-8">{subject}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Your Message</h3>
          <p className={`text-2xl font-bold ${isImposter ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>

          {isImposter && (
            <div className="mt-8 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800">
                You are the IMPOSTER! Try to blend in without getting caught!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}