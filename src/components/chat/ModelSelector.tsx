import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

interface ModelCategory {
  name: string;
  models: string[];
}

interface ModelData {
  [key: string]: ModelCategory;
}

const fetchModels = async (): Promise<ModelData> => {
  // TODO: Move to a more centralized API client
  const { data } = await axios.get('http://127.0.0.1:8000/api/v1/models');
  return data;
};

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('text');

  const { data: modelCategories, isLoading, isError } = useQuery<ModelData>({
    queryKey: ['models'],
    queryFn: fetchModels,
  });

  const currentCategoryModels = modelCategories?.[selectedCategory as keyof typeof modelCategories]?.models || [];

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    // Automatically select the first model in the new category
    const firstModel = modelCategories?.[newCategory]?.models[0];
    if (firstModel) {
      onModelChange(firstModel);
    }
  };
  
  if (isLoading) return <div className="text-muted-foreground">Loading models...</div>;
  if (isError || !modelCategories) return <div className="text-destructive">Error fetching models.</div>;

  return (
    <div className="flex items-center space-x-2 mb-3">
      <Bot className="w-4 h-4 text-muted-foreground" />
      
      {/* Category Selector */}
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-48 bg-muted/50 border-border text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background border-border">
          {Object.entries(modelCategories).map(([key, category]) => (
            <SelectItem key={key} value={key} className="text-foreground">
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Model Selector */}
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-64 bg-muted/50 border-border text-foreground">
          <SelectValue placeholder="Выберите модель" />
        </SelectTrigger>
        <SelectContent className="bg-background border-border max-h-64">
          {currentCategoryModels.map((model) => (
            <SelectItem key={model} value={model} className="text-foreground">
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
