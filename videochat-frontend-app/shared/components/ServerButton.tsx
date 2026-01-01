type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  name: string;
};

export default function ServerButton({ type, name }: ButtonProps) {
  return (
      <button type={type}>{name}</button>
  );
}
