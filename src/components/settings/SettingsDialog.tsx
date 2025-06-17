
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
    theme: 'auto',
    animations: true,
    sounds: false,
    notifications: true,
    autoScroll: true,
    fontSize: 'medium',
    aiModel: 'gemini-1.5-flash'
  });

  const aiModels = [
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', category: 'text', icon: <Zap className="w-4 h-4" /> },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', category: 'text', icon: <Brain className="w-4 h-4" /> },
    { id: 'gpt-4', name: 'GPT-4', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'gpt-4o', name: 'GPT-4o', category: 'code', icon: <Code className="w-4 h-4" /> },
    { id: 'flux-dev', name: 'Flux Dev', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'sdxl-turbo', name: 'SDXL Turbo', category: 'image', icon: <Image className="w-4 h-4" /> },
    { id: 'alloy', name: 'Alloy Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'nova', name: 'Nova Voice', category: 'audio', icon: <Music className="w-4 h-4" /> },
    { id: 'r1-1776', name: 'R1-1776', category: 'research', icon: <Search className="w-4 h-4" /> },
    { id: 'deepseek-r1', name: 'DeepSeek R1', category: 'research', icon: <Search className="w-4 h-4" /> }
  ];

  const categoryColors = {
    text: 'from-blue-500 to-cyan-500',
    code: 'from-green-500 to-emerald-500',
    image: 'from-purple-500 to-pink-500',
    audio: 'from-orange-500 to-red-500',
    research: 'from-indigo-500 to-purple-500'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-xl border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings className="w-5 h-5" />
            Настройки
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Выбор ИИ модели */}
          <div>
            <Label className="text-lg font-semibold mb-3 block">ИИ Модель</Label>
            <Select value={settings.aiModel} onValueChange={(value) => setSettings({...settings, aiModel: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20 text-white">
                {Object.entries(
                  aiModels.reduce((acc, model) => {
                    if (!acc[model.category]) acc[model.category] = [];
                    acc[model.category].push(model);
                    return acc;
                  }, {} as Record<string, typeof aiModels>)
                ).map(([category, models]) => (
                  <div key={category}>
                    <div className={`px-3 py-2 text-xs font-semibold bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} bg-clip-text text-transparent uppercase tracking-wider`}>
                      {category === 'text' && '📝 TEXT'}
                      {category === 'code' && '💻 CODE'}
                      {category === 'image' && '🖼️ IMAGE'}
                      {category === 'audio' && '🔊 AUDIO'}
                      {category === 'research' && '🔍 RESEARCH'}
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

          {/* Основные настройки */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Анимации</Label>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(checked) => setSettings({...settings, animations: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Звуки</Label>
                <Switch
                  checked={settings.sounds}
                  onCheckedChange={(checked) => setSettings({...settings, sounds: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Уведомления</Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Тема</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20 text-white">
                    <SelectItem value="auto">Авто</SelectItem>
                    <SelectItem value="dark">Тёмная</SelectItem>
                    <SelectItem value="light">Светлая</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">Размер шрифта</Label>
                <Select value={settings.fontSize} onValueChange={(value) => setSettings({...settings, fontSize: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20 text-white">
                    <SelectItem value="small">Маленький</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="large">Большой</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-between pt-4 border-t border-white/20">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Отмена
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                onClick={onLogout}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
              >
                Выйти
              </Button>
              <Button 
                onClick={() => onOpenChange(false)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
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
