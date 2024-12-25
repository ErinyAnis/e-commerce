import { twMerge } from "tailwind-merge";

interface Props {
  amount: number;
  className?: string;
}

const FormattedPrice = ({ amount, className }: Props) => {
  const priceFormat = amount.toLocaleString("en-US", {
    currency: "USD",  // Use US Dollars
    style: "currency", // Format as currency
    minimumFractionDigits: 2, // Always show 2 decimal places
  });
  return (
    <span className={twMerge("text-base font-semibold", className)}>{priceFormat}</span>
  );
};

export default FormattedPrice;
