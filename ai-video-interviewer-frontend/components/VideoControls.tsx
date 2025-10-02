'use client';

import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Monitor,
  MonitorX
} from 'lucide-react';

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onShareScreen: () => void;
  onLeaveCall: () => void;
}

export default function VideoControls({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  onToggleAudio,
  onToggleVideo,
  onShareScreen,
  onLeaveCall
}: VideoControlsProps) {
  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 p-4">
      <div className="flex items-center justify-center gap-4">
        {/* Audio Toggle */}
        <Button
          onClick={onToggleAudio}
          variant={isAudioEnabled ? "secondary" : "destructive"}
          size="lg"
          className={`w-12 h-12 rounded-full ${
            isAudioEnabled 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>

        {/* Video Toggle */}
        <Button
          onClick={onToggleVideo}
          variant={isVideoEnabled ? "secondary" : "destructive"}
          size="lg"
          className={`w-12 h-12 rounded-full ${
            isVideoEnabled 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>

        {/* Screen Share */}
        <Button
          onClick={onShareScreen}
          variant={isScreenSharing ? "default" : "secondary"}
          size="lg"
          className={`w-12 h-12 rounded-full ${
            isScreenSharing
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
        >
          {isScreenSharing ? <MonitorX className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
        </Button>

        {/* Leave Call */}
        <Button
          onClick={onLeaveCall}
          variant="destructive"
          size="lg"
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white ml-4"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}