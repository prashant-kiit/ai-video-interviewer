"use client";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  isRequired: boolean;
};

export default function Input({
  label,
  name,
  type = "text",
  isRequired,
}: InputProps) {
  return (
    <label>
      {label}:
      <input name={name} type={type} required={isRequired} />
    </label>
  );
}
