import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: ()=>void;
}

const Button = ({ children, className, disabled, onClick }: Props) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
      className={twMerge(
        "bg-lightOrange text-base text-white hover:bg-darkOrange hoverEffect px-5 py-2 md:px-8 md:py-3 rounded-full font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
