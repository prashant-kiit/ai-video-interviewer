type FormProps = {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
  button: React.ReactNode;
};

export default function Form({ action, children, button }: FormProps) {
  return (
    <form action={action}>
      <table>
        <tbody>{children}</tbody>
      </table>
      {button}
    </form>
  );
}
