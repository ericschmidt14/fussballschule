import React from "react";

export function FormWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 md:gap-8 ${className}`}>
      {children}
    </div>
  );
}

export function FormRow({
  children,
  className,
  asymmetric,
}: {
  children: React.ReactNode;
  className?: string;
  asymmetric?: boolean;
}) {
  const style = asymmetric ? "grid-cols-4" : "md:grid-cols-2";

  return <div className={`grid ${style} gap-4 ${className}`}>{children}</div>;
}
