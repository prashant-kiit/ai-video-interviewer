

type BannerProps = {
  message: string;
  color?: string;
};

export default function Banner({
  message,
  color = "red"
}: BannerProps) {
  return (
    <div>
      <p style={{ color }}>{message}</p>
    </div>
  );
}
