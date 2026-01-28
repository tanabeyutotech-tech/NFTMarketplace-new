import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = ' cursor-pointer',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'gradient-blue text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 neon-glow',
    secondary: 'glass text-blue-300 hover:bg-blue-600/30 border border-blue-500/30',
    ghost: 'bg-transparent text-blue-400 hover:bg-blue-500/10',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}
