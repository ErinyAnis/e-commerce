export const Table = ({ children }: React.PropsWithChildren) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm">{children}</table>
  </div>
);

export const TableHeader = ({ children }: React.PropsWithChildren) => (
  <thead>{children}</thead>
);

export const TableBody = ({ children }: React.PropsWithChildren) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({
  children,
  isHeader = false,
}: React.PropsWithChildren<{ isHeader?: boolean }>) => (
  <tr
    className={`border-b transition-colors ${
      isHeader ? "bg-gray-200 font-bold" : "odd:bg-white even:bg-gray-50"
    }`}
  >
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <td className={`p-4 align-middle ${className}`}>
    {children}
  </td>
);

// Card components defined inline
export const Card = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={`rounded-sm border bg-card text-card-foreground p-6 ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-col space-y-1.5">{children}</div>
);

export const CardTitle = ({ children }: React.PropsWithChildren) => (
  <div className="text-base lg:text-xl font-semibold leading-none tracking-tight mb-3 lg:mb-5">
    {children}
  </div>
);

export const CardContent = ({ children }: React.PropsWithChildren) => (
  <div className="">{children}</div>
);

export const Badge = ({
  children,
  variant = "default",
}: React.PropsWithChildren<{
  variant?: "default" | "success" | "destructive";
}>) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    success: "bg-green-500 text-white",
    destructive: "bg-red-500 text-white",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};

export const Button = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<{ className?: string; onClick?: () => void }>) => (
  <button className={`rounded-sm py-2.5 px-3 text-sm hoverEffect max-h-10 lg:max-w-40 ${className}`} onClick={onClick}>
    {children}
  </button>
);
