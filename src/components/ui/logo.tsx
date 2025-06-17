
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
      <div className={`${sizeClasses[size]} bg-black border-2 border-neon-purple rounded-lg neon-glow relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan animate-cyber-scan"></div>
        <span className="text-neon-purple font-bold text-xl relative z-10 flex items-center justify-center h-full neon-text">
          D
        </span>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold neon-text ${textSizeClasses[size]}`}>
          DanyBot
        </span>
        <span className="text-xs text-neon-cyan -mt-1 font-mono">by Симонов Данил</span>
      </div>
    </div>
  );
};
