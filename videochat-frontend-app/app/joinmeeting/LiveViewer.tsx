import { useEffect, useRef } from "react";

export default function LiveViewer({ meetingId }: { meetingId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const mediaSource = new MediaSource();
    videoRef.current.src = URL.createObjectURL(mediaSource);

    let sourceBuffer: SourceBuffer | null = null;
    let ws: WebSocket | null = null;
    const queue: ArrayBuffer[] = [];

    const onSourceOpen = () => {
      sourceBuffer = mediaSource.addSourceBuffer(
        'video/webm; codecs="vp8,opus"'
      );
      sourceBuffer.mode = "sequence";

      sourceBuffer.addEventListener("updateend", () => {
        if (queue.length > 0 && !sourceBuffer!.updating) {
          sourceBuffer!.appendBuffer(queue.shift()!);
        }
      });

      ws = new WebSocket(`ws://localhost:8080/streamlive/${meetingId}`);
      ws.binaryType = "arraybuffer";

      ws.onmessage = (event) => {
        if (!sourceBuffer) return;

        if (sourceBuffer.updating || queue.length > 0) {
          queue.push(event.data);
        } else {
          sourceBuffer.appendBuffer(event.data);
        }
      };
    };

    mediaSource.addEventListener("sourceopen", onSourceOpen);

    return () => {
      mediaSource.removeEventListener("sourceopen", onSourceOpen);
      ws?.close();
      if (mediaSource.readyState === "open") {
        mediaSource.endOfStream();
      }
    };
  }, [meetingId]);

  return <video ref={videoRef} controls autoPlay />;
}
