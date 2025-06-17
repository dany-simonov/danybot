
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Search } from 'lucide-react';

interface SearchModeSelectorProps {
  mode: 'quick' | 'research';
  onModeChange: (mode: 'quick' | 'research') => void;
}

export const SearchModeSelector = ({ mode, onModeChange }: SearchModeSelectorProps) => {
  return (
    <div className="flex mb-3 bg-muted rounded-lg p-1">
      <Button
        variant={mode === 'quick' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('quick')}
        className={`flex-1 text-xs font-medium ${
          mode === 'quick' 
            ? 'bg-background text-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Zap className="w-3 h-3 mr-1" />
        Quick Search
      </Button>
      <Button
        variant={mode === 'research' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('research')}
        className={`flex-1 text-xs font-medium ${
          mode === 'research' 
            ? 'bg-background text-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Search className="w-3 h-3 mr-1" />
        Deep Research
      </Button>
    </div>
  );
};
