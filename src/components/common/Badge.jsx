import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-stone-100 text-stone-800 border border-stone-200',
    amber: 'bg-amber-50 text-amber-900 border border-amber-200',
    wood: 'bg-[#f4ebe6] text-[#5c4033] border border-[#e0cec7]',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    luxury: 'bg-stone-900 text-amber-300 border border-amber-600/30',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size] || sizeStyles.sm} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
};
