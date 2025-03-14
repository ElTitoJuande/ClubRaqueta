import React from 'react';

export const Card = ({ className = '', children }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = '', children }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children }) => {
  return (
    <div className={`p-6 pt-0 flex items-center ${className}`}>
      {children}
    </div>
  );
};
