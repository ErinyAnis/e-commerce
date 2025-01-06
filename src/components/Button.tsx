import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, className, disabled }: Props) => {
  return (
    <button
    disabled={disabled}
      className={twMerge(
        "bg-lightOrange text-base text-white hover:bg-darkOrange hoverEffect md:px-8 md:py-3 rounded-full font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
