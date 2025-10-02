'use client';

import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface VideoStreamProps {
  stream: MediaStream;
  isLocal: boolean;
  userName: string;
  muted?: boolean;
}

const VideoStream = forwardRef<HTMLVideoElement, VideoStreamProps>(
  ({ stream, isLocal, userName, muted = false }, ref) => {
    const hasVideo = stream.getVideoTracks().some(track => track.enabled);
    const hasAudio = stream.getAudioTracks().some(track => track.enabled);

    return (
      <div className="relative w-full h-full bg-slate-800">
        {hasVideo ? (
          <video
            ref={ref}
            autoPlay
            playsInline
            muted={muted}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <VideoOff className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-300 font-medium">{userName}</p>
              <p className="text-slate-500 text-sm">Camera is off</p>
            </div>
          </div>
        )}

        {/* User Info Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-black/60 text-white border-0 backdrop-blur-sm"
          >
            <span className="mr-2">{userName}</span>
            {hasAudio ? (
              <Mic className="w-3 h-3 text-green-400" />
            ) : (
              <MicOff className="w-3 h-3 text-red-400" />
            )}
          </Badge>
        </div>

        {/* Local Video Indicator */}
        {isLocal && (
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-black/60 border-slate-500 text-white">
              You
            </Badge>
          </div>
        )}
      </div>
    );
  }
);

VideoStream.displayName = 'VideoStream';

export default VideoStream;