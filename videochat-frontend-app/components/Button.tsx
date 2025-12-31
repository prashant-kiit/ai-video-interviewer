type ButtonProps = {
  name: string;
  handler: () => void;
};

export default function Button({
  name,
  handler,
}: ButtonProps) {
  return (
    <form action={handler}>
      <button type="submit">{name}</button>
    </form>
  );
}
