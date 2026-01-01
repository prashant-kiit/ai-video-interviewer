type ErrorProps = {
  message: string;
};

export default function Error({
  message
}: ErrorProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
