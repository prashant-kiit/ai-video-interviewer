"use client";

type ClientButtonProps = {
  name: string;
  handler: () => void;
};

export default function ClientButton({ name, handler }: ClientButtonProps) {
  return (
    <form action={handler}>
      <button type="submit">{name}</button>
    </form>
  );
}
