"use client";

import { Loader } from "@/shared/components/Loader";
import { useEffect, useState, useRef, useCallback } from "react";

export default function MeetingClient({ meetingId }: { meetingId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

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

  // useEffect(() => {
  //   if (!stream) return;

  //   const recorder = new MediaRecorder(stream, {
  //     mimeType: "video/webm; codecs=vp8,opus",
  //   });

  //   // recorderRef.current = recorder;

  //   recorder.ondataavailable = (event) => {
  //     if (event.data.size > 0) {
  //       // console.log("Chunk:", event.data);
  //     }
  //   };

  //   recorder.onstart = () => console.log("Recording started");
  //   recorder.onstop = () => console.log("Recording stopped");

  //   recorder.start(1000);

  //   return () => {
  //     recorder.stop();
  //   };
  // }, [stream]);

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
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Chunk:", event.data);
        }
      };

      recorder.onstart = () => console.log("Recording started");
      recorder.onstop = () => console.log("Recording stopped");

      recorder.start(1000);
      recorderRef.current = recorder;
      setRecording(recorder);
    } else {
      recorderRef.current?.stop();
      recorderRef.current = null;
      setRecording(null);
    }
  };

  return (
    <div>
      <div>
        {stream ? (
          <video ref={videoRef} autoPlay muted playsInline width={300} />
        ) : (
          <Loader message="Loading video..." />
        )}
      </div>
      <div>
        <button onClick={toggleVideo}>
          {videoOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        <button onClick={toggleAudio}>
          {audioOn ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button onClick={toggleRecording} disabled={!stream}>
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <p>Meeting {meetingId}</p>
    </div>
  );
}
