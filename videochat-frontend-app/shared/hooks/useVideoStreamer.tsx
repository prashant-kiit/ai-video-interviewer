import { useEffect, useState, useRef, useCallback } from "react";
import {
  uploadRecording,
  saveRecording,
} from "@/app/meeting/[meetingId]/meeting.handler";
import { useToken } from "../store/token";
import { streamLiveVideo } from "@/app/meeting/[meetingId]/stream.handler";

function useVideoStreamer(meetingId: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const liveStreamRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const [liveStream, setLiveStream] = useState<MediaRecorder | null>(null);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const { getToken } = useToken();

  const startMedia = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
    setStream(mediaStream);
  };

  const startMediaLog = useCallback(() => {
    if (!stream) return;

    stream.getTracks().forEach((track) => {
      console.log(
        `[${track.kind}] enabled=${track.enabled}, readyState=${track.readyState}`,
      );

      track.onended = () => console.log(`${track.kind} track ended`);
      track.onmute = () => console.log(`${track.kind} muted`);
      track.onunmute = () => console.log(`${track.kind} unmuted`);
    });
  }, [stream]);

  useEffect(() => {
    (() => {
      startMedia();
    })();
  }, []);

  useEffect(() => {
    (() => {
      startMediaLog();
    })();
  }, [stream, videoOn, audioOn, startMediaLog]);

  const toggleVideo = () => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setVideoOn(track.enabled);
    });
  };

  const toggleAudio = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setAudioOn(track.enabled);
    });
  };

  const toggleRecording = () => {
    if (!recording) {
      if (!stream) return;

      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8,opus",
      });

      recorder.ondataavailable = async (event) => {
        if (event.data.size === 0) return;

        const formData = new FormData();
        formData.append("meetingId", meetingId);
        formData.append("timestamp", Date.now().toString());
        formData.append("chunk", event.data);
        console.log(event.data);

        const result = await uploadRecording(formData, getToken());
        console.log(result);
      };

      recorder.onstart = () => console.log("Recording started");
      recorder.onstop = async () => {
        console.log("Recording stopped");
        const result = await saveRecording(meetingId, getToken());
        console.log(result);
      };

      recorder.start(1000);
      recorderRef.current = recorder;
      setRecording(recorder);
    } else {
      recorderRef.current?.stop();
      recorderRef.current = null;
      setRecording(null);
    }
  };

  const startLiveStream = async () => {
    try {
      if (!stream || liveStream) return;

      const liveStreamer = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8,opus",
      });

      liveStreamer.ondataavailable = async (event) => {
        if (event.data.size === 0) return;

        const formData = new FormData();
        formData.append("meetingId", meetingId);
        formData.append("timestamp", Date.now().toString());
        formData.append("chunk", event.data);
        console.log(event.data);

        const result = await streamLiveVideo(formData, getToken());
        console.log(result);
      };

      liveStreamer.onstart = () => console.log("Live stream started");
      liveStreamer.onstop = async () => console.log("Live stream stopped");

      liveStreamer.start(1000);
      liveStreamRef.current = liveStreamer;
      setLiveStream(liveStreamer);
    } catch (error) {
      console.error("Live stream error", error);
      setLiveStream(null);
    }
  };

  return {
    videoRef,
    stream,
    recording,
    videoOn,
    audioOn,
    toggleVideo,
    toggleAudio,
    toggleRecording,
    startLiveStream,
  };
}

export default useVideoStreamer;
