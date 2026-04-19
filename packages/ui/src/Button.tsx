import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "0.5rem 1.25rem",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background:
      variant === "primary" ? "var(--color-primary, #0070f3)" : "transparent",
    color:
      variant === "primary"
        ? "var(--color-white, #ffffff)"
        : "var(--color-text, #111827)",
    ...(variant === "secondary" && {
      border: "1px solid var(--color-border, #e5e7eb)",
    }),
  };

  if (href) {
    return (
      <a href={href} style={baseStyle} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button style={baseStyle} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
