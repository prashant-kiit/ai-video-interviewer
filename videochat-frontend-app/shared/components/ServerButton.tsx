type ServerButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  name: string;
};

export default function ServerButton({ type, name }: ServerButtonProps) {
  return <button type={type}>{name}</button>;
}
