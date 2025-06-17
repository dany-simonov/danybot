
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg apple-hover smooth-transition relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <span className="text-white font-bold text-xl relative z-10 flex items-center justify-center h-full">
          D
        </span>
      </div>
      <div className="flex flex-col">
        <span className={`font-semibold text-foreground ${textSizeClasses[size]}`}>
          DanyBot
        </span>
        <span className="text-xs text-muted-foreground -mt-1">by Симонов Даниил</span>
      </div>
    </div>
  );
};
