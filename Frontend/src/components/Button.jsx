import React from "react";

const Button = ({ children, onClick, className = "", variant = "default", disabled = false, ...props }) => {
  // Estilos base para todos los botones
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Estilos específicos para cada variante
  const variantStyles = {
    default: "bg-yellow-700 text-green-200 hover:bg-yellow-900 px-6 py-3",
    outline: "border border-yellow-700 text-yellow-700 bg-transparent hover:bg-yellow-900 hover:text-white px-6 py-3",
    link: "text-yellow-700 underline-offset-4 hover:underline p-0",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
