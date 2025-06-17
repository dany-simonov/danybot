
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const ThemeToggle = ({ theme, onThemeChange }: ThemeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onThemeChange('light')}
        className="flex-1"
      >
        <Sun className="w-4 h-4 mr-2" />
        Светлая
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onThemeChange('dark')}
        className="flex-1"
      >
        <Moon className="w-4 h-4 mr-2" />
        Темная
      </Button>
    </div>
  );
};
