import React from 'react';

/**
 * Reusable Button Component
 * SonarQube compliant: strict prop handling, accessible button roles.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    icon: 'p-2 rounded-lg',
  };

  const variantStyles = {
    primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-stone-950 focus:ring-stone-900 shadow-sm',
    secondary: 'bg-amber-700 text-white hover:bg-amber-800 active:bg-amber-900 focus:ring-amber-600 shadow-sm',
    accent: 'bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-400',
    outline: 'border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 active:bg-stone-100 focus:ring-stone-400',
    ghost: 'text-stone-700 hover:bg-stone-100 focus:ring-stone-300',
    whatsapp: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500 shadow-sm',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  );
};
