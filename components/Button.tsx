import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 rounded-full font-divine tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] hover:scale-105 border border-amber-400/30",
    secondary: "bg-indigo-900/50 text-indigo-100 border border-indigo-500/30 hover:bg-indigo-800/50 hover:border-indigo-400",
    outline: "bg-transparent text-amber-200 border border-amber-500/50 hover:bg-amber-900/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} 
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{icon}{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      )}
    </button>
  );
};