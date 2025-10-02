'use client';

import { useState } from 'react';
import VideoChat from '@/components/VideoChat';
import JoinRoom from '@/components/JoinRoom';

export default function Home() {
  const [roomId, setRoomId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isInCall, setIsInCall] = useState<boolean>(false);

  const handleJoinRoom = (room: string, name: string) => {
    setRoomId(room);
    setUserName(name);
    setIsInCall(true);
  };

  const handleLeaveRoom = () => {
    setIsInCall(false);
    setRoomId('');
    setUserName('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {!isInCall ? (
        <JoinRoom onJoinRoom={handleJoinRoom} />
      ) : (
        <VideoChat 
          roomId={roomId} 
          userName={userName} 
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </main>
  );
}