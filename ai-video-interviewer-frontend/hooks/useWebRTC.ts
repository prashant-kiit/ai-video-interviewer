'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useWebRTC(roomId: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('new');

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const signalingChannel = useRef<BroadcastChannel | null>(null);

  // Initialize peer connection
  const createPeerConnection = useCallback(() => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.addEventListener('connectionstatechange', () => {
      setConnectionState(peerConnection.connectionState);
      setIsConnected(peerConnection.connectionState === 'connected');
    });

    peerConnection.addEventListener('track', (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
    });

    peerConnection.addEventListener('icecandidate', (event) => {
      if (event.candidate && signalingChannel.current) {
        signalingChannel.current.postMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
          roomId,
        });
      }
    });

    return peerConnection;
  }, [roomId]);

  // Initialize local media
  const initializeMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      localStreamRef.current = stream;

      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }, []);

  // Initialize signaling
  const initializeSignaling = useCallback(() => {
    const channel = new BroadcastChannel(`videochat-${roomId}`);
    
    channel.addEventListener('message', async (event) => {
      const { type, data } = event.data;
      const peerConnection = peerConnectionRef.current;

      if (!peerConnection) return;

      switch (type) {
        case 'offer':
          await peerConnection.setRemoteDescription(data);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          channel.postMessage({
            type: 'answer',
            data: answer,
            roomId,
          });
          break;

        case 'answer':
          await peerConnection.setRemoteDescription(data);
          break;

        case 'ice-candidate':
          await peerConnection.addIceCandidate(data.candidate);
          break;
      }
    });

    return channel;
  }, [roomId]);

  // Create offer
  const createOffer = useCallback(async () => {
    const peerConnection = peerConnectionRef.current;
    if (!peerConnection || !signalingChannel.current) return;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    signalingChannel.current.postMessage({
      type: 'offer',
      data: offer,
      roomId,
    });
  }, [roomId]);

  // Initialize WebRTC
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize media first
        const stream = await initializeMedia();
        
        // Create peer connection
        const peerConnection = createPeerConnection();
        peerConnectionRef.current = peerConnection;

        // Add local stream tracks
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        // Initialize signaling
        const channel = initializeSignaling();
        signalingChannel.current = channel;

        // Create offer after a short delay to allow other peer to be ready
        setTimeout(() => {
          createOffer();
        }, 1000);

      } catch (error) {
        console.error('Failed to initialize WebRTC:', error);
      }
    };

    initialize();

    // Cleanup
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (signalingChannel.current) {
        signalingChannel.current.close();
      }
    };
  }, [roomId, initializeMedia, createPeerConnection, initializeSignaling, createOffer]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  }, []);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  }, []);

  // Share screen
  const shareScreen = useCallback(async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing, return to camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const videoTrack = stream.getVideoTracks()[0];
        const sender = peerConnectionRef.current?.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );

        if (sender) {
          await sender.replaceTrack(videoTrack);
        }

        // Stop previous stream
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(track => track.stop());
        }

        setLocalStream(stream);
        localStreamRef.current = stream;
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = peerConnectionRef.current?.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );

        if (sender) {
          await sender.replaceTrack(videoTrack);
        }

        // Combine screen video with original audio
        const audioTrack = localStreamRef.current?.getAudioTracks()[0];
        const combinedStream = new MediaStream([videoTrack]);
        if (audioTrack) {
          combinedStream.addTrack(audioTrack);
        }

        setLocalStream(combinedStream);
        setIsScreenSharing(true);

        // Handle screen share end
        videoTrack.addEventListener('ended', () => {
          shareScreen(); // This will switch back to camera
        });
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }, [isScreenSharing]);

  return {
    localStream,
    remoteStream,
    isConnected,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    connectionState,
    toggleAudio,
    toggleVideo,
    shareScreen,
  };
}