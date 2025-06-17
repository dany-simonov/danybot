
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
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
        <span className="text-white font-bold text-xl relative z-10">D</span>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          DanyBot
        </span>
        <span className="text-xs text-gray-400 -mt-1">by Симонов Данил</span>
      </div>
    </div>
  );
};
