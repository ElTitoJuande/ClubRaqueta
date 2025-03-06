import React from 'react'

const Button = ({ children, onClick, className = "", disabled = false }) => {
    return (
      <button
        className={`bg-yellow-700 text-green-200 hover:bg-yellow-900 px-6 py-3 text-lg rounded-md transition-all ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  