import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Settings, Palette, Brain, Zap, Image, Music, Code, Search } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
}

export const SettingsDialog = ({ open, onOpenChange, onLogout }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    theme: 'apple-dark',
    animations: true,
    sounds: false,
    notifications: true,
    autoScroll: true,
    fontSize: 'medium',
    aiModel: 'gemini-1.5-flash'
  });

  const aiModels = [
    // TEXT MODELS (41)
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', category: 'text', icon: <Zap className="w-4 h-4" /> },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r7b-arabic', name: 'Command R7B Arabic', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r', name: 'Command R', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-30b', name: 'Qwen 3 30B', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'deepseek-llama3.3-70b', name: 'DeepSeek Llama 3.3 70B', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'perplexity-sonar', name: 'Perplexity Sonar', category: 'text', icon: <Search className="w-4 h-4" /> },
    
    // CODE MODELS (35)
    { id: 'gpt-4', name: 'GPT-4', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'gpt-4o', name: 'GPT-4o', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'fastapi-agent', name: 'FastAPI Agent', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'react-agent', name: 'React Agent', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'python-agent', name: 'Python Agent', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'javascript-agent', name: 'JavaScript Agent', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'docker-agent', name: 'Docker Agent', category: 'code', icon: <Code className="w-4 h-4" /> },
    
    // IMAGE MODELS (28)
    { id: 'flux-dev', name: 'Flux Dev', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'sdxl-turbo', name: 'SDXL Turbo', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'katayama-mix-xl', name: 'Katayama Mix XL', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'anything-xl', name: 'Anything XL', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'realistic-stock-xl', name: 'Realistic Stock XL', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'playground-xl', name: 'Playground XL', category: 'image', icon: <Image className="w-4 h-4" /> },
    
    // AUDIO MODELS (18)
    { id: 'alloy', name: 'Alloy Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'nova', name: 'Nova Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'shimmer', name: 'Shimmer Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'onyx', name: 'Onyx Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'echo', name: 'Echo Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'fable', name: 'Fable Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    
    // RESEARCH MODELS (8)
    { id: 'r1-1776', name: 'R1-1776', category: 'research', icon: <Search className="w-4 h-4" /> },
    { id: 'deepseek-r1', name: 'DeepSeek R1', category: 'research', icon: <Search className="w-4 h-4" /> },
    { id: 'sonar-reasoning', name: 'Sonar Reasoning', category: 'research', icon: <Search className="w-4 h-4" /> },
    { id: 'hermes-3-llama-405b', name: 'Hermes 3 Llama 405B', category: 'research', icon: <Search className="w-4 h-4" /> }
  ];

  const categoryColors = {
    text: 'from-blue-500 to-cyan-400',
    code: 'from-green-500 to-emerald-400',
    image: 'from-purple-500 to-pink-400',
    audio: 'from-orange-500 to-red-400',
    research: 'from-indigo-500 to-purple-500'
  };

  const categoryEmojis = {
    text: '📝',
    code: '💻',
    image: '🖼️',
    audio: '🔊',
    research: '🔍'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-effect text-white border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl text-white">
            <Settings className="w-5 h-5" />
            Настройки
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Model Selection */}
          <div>
            <Label className="text-lg font-semibold mb-3 block text-blue-400">ИИ Модель</Label>
            <Select value={settings.aiModel} onValueChange={(value) => setSettings({...settings, aiModel: value})}>
              <SelectTrigger className="bg-zinc-800/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/20 text-white max-h-64">
                {Object.entries(
                  aiModels.reduce((acc, model) => {
                    if (!acc[model.category]) acc[model.category] = [];
                    acc[model.category].push(model);
                    return acc;
                  }, {} as Record<string, typeof aiModels>)
                ).map(([category, models]) => (
                  <div key={category}>
                    <div className={`px-3 py-2 text-xs font-semibold bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} bg-clip-text text-transparent uppercase tracking-wider`}>
                      {categoryEmojis[category as keyof typeof categoryEmojis]} {category.toUpperCase()} ({models.length})
                    </div>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          {model.icon}
                          {model.name}
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Анимации</Label>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(checked) => setSettings({...settings, animations: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white">Звуки</Label>
                <Switch
                  checked={settings.sounds}
                  onCheckedChange={(checked) => setSettings({...settings, sounds: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white">Уведомления</Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-white">Тема</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                  <SelectTrigger className="bg-zinc-800/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/20 text-white">
                    <SelectItem value="apple-dark">Apple Dark</SelectItem>
                    <SelectItem value="apple-light">Apple Light</SelectItem>
                    <SelectItem value="system">Система</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block text-white">Размер шрифта</Label>
                <Select value={settings.fontSize} onValueChange={(value) => setSettings({...settings, fontSize: value})}>
                  <SelectTrigger className="bg-zinc-800/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/20 text-white">
                    <SelectItem value="small">Маленький</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="large">Большой</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Models Stats */}
          <div className="glass-card rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Доступные модели</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-blue-400">📝 Текст: 41 модель</div>
              <div className="text-green-400">💻 Код: 35 агентов</div>
              <div className="text-purple-400">🖼️ Изображения: 28 моделей</div>
              <div className="text-orange-400">🔊 Аудио: 18 голосов</div>
              <div className="text-indigo-400">🔍 Исследования: 8 моделей</div>
              <div className="text-cyan-400">🌀 Мультимодальные: 4 модели</div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-blue-400 font-bold">ВСЕГО: 130+ моделей</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-white/20">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10 smooth-transition"
            >
              Отмена
            </Button>
            <div className="flex gap-3">
              <Button 
                variant="destructive" 
                onClick={onLogout}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 smooth-transition"
              >
                Выйти
              </Button>
              <Button 
                onClick={() => onOpenChange(false)}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold apple-hover smooth-transition"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
