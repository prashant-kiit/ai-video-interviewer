"use client";

import Video from "../../../shared/components/Video";
import ClientButton from "../../../shared/components/ClientButton";
import useVideoStreamer from "../../../shared/hooks/useVideoStreamer";

export default function MeetingClient({ meetingId }: { meetingId: string }) {
  const {
    recording,
    videoRef,
    toggleVideo,
    toggleAudio,
    videoOn,
    audioOn,
    toggleRecording,
  } = useVideoStreamer(meetingId);

  return (
    <div>
      <div>
        <Video videoRef={videoRef} />
      </div>
      <div>
        <ClientButton
          name={videoOn ? "Turn Camera Off" : "Turn Camera On"}
          handler={toggleVideo}
        />
        <ClientButton
          name={audioOn ? "Mute Mic" : "Unmute Mic"}
          handler={toggleAudio}
        />
        <ClientButton
          name={recording ? "Stop Recording" : "Start Recording"}
          handler={toggleRecording}
        />
      </div>
      <div>
        <p>Meeting {meetingId}</p>
      </div>
    </div>
  );
}
