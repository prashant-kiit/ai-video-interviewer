type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  isRequired: boolean;
};

export default function FormInput({
  label,
  name,
  type = "text",
  isRequired,
}: FormInputProps) {
  return (
    <tr>
      <td>
        <label>{label}:</label>
      </td>
      <td>
        <input name={name} type={type} required={isRequired} />
      </td>
    </tr>
  );
}
