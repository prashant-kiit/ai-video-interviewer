type VideoProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

function Video({
  videoRef
}: VideoProps) {
  return <video ref={videoRef} autoPlay muted playsInline width={300} />
}

export default Video;