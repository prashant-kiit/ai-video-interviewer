type ErrorProps = {
  message: string;
};

export default function Error({
  message
}: ErrorProps) {
  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}
