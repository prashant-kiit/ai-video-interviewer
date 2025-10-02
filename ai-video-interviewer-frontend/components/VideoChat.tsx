'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VideoControls from '@/components/VideoControls';
import VideoStream from '@/components/VideoStream';
import { useWebRTC } from '@/hooks/useWebRTC';
import { Copy, Users, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface VideoChatProps {
  roomId: string;
  userName: string;
  onLeaveRoom: () => void;
}

export default function VideoChat({ roomId, userName, onLeaveRoom }: VideoChatProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const {
    localStream,
    remoteStream,
    isConnected,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
    shareScreen,
    isScreenSharing,
    connectionState
  } = useWebRTC(roomId);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy room ID');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-slate-800/80 text-white border-slate-600">
              <Users className="w-3 h-3 mr-1" />
              Room: {roomId}
            </Badge>
            <Button
              onClick={copyRoomId}
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={isConnected ? "default" : "destructive"}
              className={isConnected ? "bg-green-600" : "bg-red-600"}
            >
              {isConnected ? (
                <><Wifi className="w-3 h-3 mr-1" /> Connected</>
              ) : (
                <><WifiOff className="w-3 h-3 mr-1" /> {connectionState}</>
              )}
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {userName}
            </Badge>
          </div>
        </div>
      </div>

      {/* Video Streams Container */}
      <div className="relative h-screen flex">
        {/* Remote Video (Main) */}
        <div className="flex-1 relative bg-slate-800">
          {remoteStream ? (
            <VideoStream
              ref={remoteVideoRef}
              stream={remoteStream}
              isLocal={false}
              userName="Remote User"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-12 h-12 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Waiting for others to join</h3>
                  <p className="text-slate-400">Share the room ID: <span className="font-mono text-blue-400">{roomId}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        {localStream && (
          <div className="absolute bottom-20 right-4 w-64 h-48 bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-600 shadow-2xl z-20">
            <VideoStream
              ref={localVideoRef}
              stream={localStream}
              isLocal={true}
              userName={userName}
              muted={true}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <VideoControls
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          isScreenSharing={isScreenSharing}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onShareScreen={shareScreen}
          onLeaveCall={onLeaveRoom}
        />
      </div>
    </div>
  );
}