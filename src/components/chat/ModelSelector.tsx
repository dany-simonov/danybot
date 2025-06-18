
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const topModels = [
    'TeachAnything gemini-1.5-flash',
    'TeachAnything gemini-1.5-pro',
    'Cohere command-r',
    'OIVSCode gpt-4.1-mini',
    'Perplexity sonar-pro',
    'Qwen-2.5-max',
    'LambdaChat deepseek-r1',
    'Perplexity r1-1776'
  ];

  return (
    <div className="flex items-center space-x-2 mb-3">
      <Bot className="w-4 h-4 text-muted-foreground" />
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-64 bg-muted/50 border-border text-foreground">
          <SelectValue placeholder="Выберите модель ИИ" />
        </SelectTrigger>
        <SelectContent className="bg-background border-border">
          {topModels.map((model) => (
            <SelectItem key={model} value={model} className="text-foreground">
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
