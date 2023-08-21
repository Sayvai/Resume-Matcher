import clsx from "clsx";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("flex gap-2 w-fit rounded-md p-4", props.className)}
    >
      {children}
    </button>
  );
};

export default Button;
