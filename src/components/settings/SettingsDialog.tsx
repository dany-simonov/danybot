
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from './ThemeToggle';
import { Settings, Brain, Code, Image, Music, Search, Zap } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
}

export const SettingsDialog = ({ open, onOpenChange, onLogout }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    theme: 'dark' as 'light' | 'dark',
    notifications: true,
    autoScroll: true,
    aiModel: 'gemini-1.5-flash',
    personalInfo: ''
  });

  const allAiModels = [
    // TEXT MODELS (41)
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', category: 'text', provider: 'TeachAnything', icon: <Zap className="w-4 h-4" /> },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', category: 'text', provider: 'TeachAnything', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r7b-arabic', name: 'Command R7B Arabic', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r7b-12-2024', name: 'Command R7B 12-2024', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'apriel-5b-instruct', name: 'Apriel 5B Instruct', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r', name: 'Command R', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-30b-a3b', name: 'Qwen 3 30B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', category: 'text', provider: 'OIVSCode', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-8b', name: 'Qwen 3 8B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'deepseek-llama3.3-70b', name: 'DeepSeek Llama 3.3 70B', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-a-03-2025', name: 'Command A 03-2025', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r-08-2024', name: 'Command R 08-2024', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'lfm-40b', name: 'LFM 40B', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r-plus', name: 'Command R Plus', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', category: 'text', provider: 'OIVSCode', icon: <Brain className="w-4 h-4" /> },
    { id: 'llama3.3-70b-instr-fp8', name: 'Llama 3.3 70B Instruct', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen25-coder-32b-instr', name: 'Qwen 2.5 Coder 32B', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-0.6b', name: 'Qwen 3 0.6B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'perplexity-sonar', name: 'Perplexity Sonar', category: 'text', provider: 'Perplexity', icon: <Search className="w-4 h-4" /> },
    { id: 'perplexity-sonar-pro', name: 'Perplexity Sonar Pro', category: 'text', provider: 'Perplexity', icon: <Search className="w-4 h-4" /> },
    { id: 'wewordle-gpt-4', name: 'GPT-4', category: 'text', provider: 'WeWordle', icon: <Brain className="w-4 h-4" /> },
    { id: 'command-r-plus-08-2024', name: 'Command R Plus 08-2024', category: 'text', provider: 'Cohere', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-2.5', name: 'Qwen 2.5', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'llama3.3-70b-instr-fp8-2', name: 'Llama 3.3 70B Instruct FP8', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'yqcloud-gpt-4', name: 'GPT-4', category: 'text', provider: 'Yqcloud', icon: <Brain className="w-4 h-4" /> },
    { id: 'free2gpt-gemini-1.5-pro', name: 'Gemini 1.5 Pro', category: 'text', provider: 'Free2GPT', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-1.7b', name: 'Qwen 3 1.7B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'free2gpt-gemini-1.5-flash', name: 'Gemini 1.5 Flash', category: 'text', provider: 'Free2GPT', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-2.5-max', name: 'Qwen 2.5 Max', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-4b', name: 'Qwen 3 4B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-2-72b', name: 'Qwen 2 72B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen3-32b-fp8', name: 'Qwen 3 32B FP8', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-235b', name: 'Qwen 3 235B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'perplexity-r1-1776', name: 'R1-1776', category: 'research', provider: 'Perplexity', icon: <Search className="w-4 h-4" /> },
    { id: 'deepseek-r1', name: 'DeepSeek R1', category: 'research', provider: 'LambdaChat', icon: <Search className="w-4 h-4" /> },
    { id: 'qwen-3-14b', name: 'Qwen 3 14B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'qwen-3-32b', name: 'Qwen 3 32B', category: 'text', provider: 'Qwen', icon: <Brain className="w-4 h-4" /> },
    { id: 'perplexity-sonar-reasoning', name: 'Sonar Reasoning', category: 'research', provider: 'Perplexity', icon: <Search className="w-4 h-4" /> },
    { id: 'perplexity-sonar-reasoning-pro', name: 'Sonar Reasoning Pro', category: 'research', provider: 'Perplexity', icon: <Search className="w-4 h-4" /> },
    { id: 'hermes-3-llama-405b', name: 'Hermes 3 Llama 405B', category: 'research', provider: 'LambdaChat', icon: <Search className="w-4 h-4" /> },
    { id: 'llama3.1-nemotron-70b', name: 'Llama 3.1 Nemotron 70B', category: 'text', provider: 'LambdaChat', icon: <Brain className="w-4 h-4" /> },
    
    // CODE MODELS (35)
    { id: 'blackbox-gpt-4', name: 'GPT-4', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'fastapi-agent', name: 'FastAPI Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'blackbox-gpt-4o', name: 'GPT-4o', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'builder-agent', name: 'Builder Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'firebase-agent', name: 'Firebase Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'flask-agent', name: 'Flask Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'blackbox-gpt-4.1-nano', name: 'GPT-4.1 Nano', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'angularjs-agent', name: 'AngularJS Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'blackbox-gpt-4o-mini', name: 'GPT-4o Mini', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'flutter-agent', name: 'Flutter Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'erlang-agent', name: 'Erlang Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'digitalocean-agent', name: 'DigitalOcean Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'swift-agent', name: 'Swift Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'mongodb-agent', name: 'MongoDB Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'javascript-agent', name: 'JavaScript Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'xcode-agent', name: 'Xcode Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'go-agent', name: 'Go Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'git-agent', name: 'Git Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'html-agent', name: 'HTML Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'pytorch-agent', name: 'PyTorch Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'android-agent', name: 'Android Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'blackbox-gpt-4.1-mini', name: 'GPT-4.1 Mini', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'java-agent', name: 'Java Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'gitlab-agent', name: 'Gitlab Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'nextjs-agent', name: 'Next.js Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'python-agent', name: 'Python Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'blackboxai', name: 'BlackboxAI', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'electron-agent', name: 'Electron Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'bitbucket-agent', name: 'Bitbucket Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'azure-agent', name: 'Azure Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'docker-agent', name: 'Docker Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'godot-agent', name: 'Godot Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'react-agent', name: 'React Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'gcp-agent', name: 'Google Cloud Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },
    { id: 'heroku-agent', name: 'Heroku Agent', category: 'code', provider: 'Blackbox', icon: <Code className="w-4 h-4" /> },

    // IMAGE MODELS (28)
    { id: 'sdxl-turbo', name: 'SDXL Turbo', category: 'image', provider: 'ImageLabs', icon: <Image className="w-4 h-4" /> },
    { id: 'katayama-mix-xl', name: 'Katayama Mix XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'new-school', name: 'New School', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'anima-pencil-xl', name: 'Anima Pencil XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'flame-design', name: 'Flame Design', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'blackforest-flux-dev', name: 'Flux Dev', category: 'image', provider: 'BlackForest', icon: <Image className="w-4 h-4" /> },
    { id: 'anything-xl', name: 'Anything XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'arta-f-dev', name: 'F-Dev', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'arta-flux-dev', name: 'Flux Dev', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'trash-polka', name: 'Trash Polka', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'pony-xl', name: 'Pony XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'yamers-realistic-xl', name: 'Yamers Realistic XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'watercolor', name: 'Watercolor', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'embroidery-tattoo', name: 'Embroidery Tattoo', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'realistic-tattoo', name: 'Realistic Tattoo', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'playground-xl', name: 'Playground XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'realistic-stock-xl', name: 'Realistic Stock XL', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'on-limbs-black', name: 'On Limbs Black', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'photographic', name: 'Photographic', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'death-metal', name: 'Death Metal', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'neo-traditional', name: 'Neo Traditional', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'red-and-black', name: 'Red and Black', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'kawaii', name: 'Kawaii', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'biomech', name: 'Biomech', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'arta-flux-pro', name: 'Flux Pro', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'arta-flux', name: 'Flux', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'mini-tattoo', name: 'Mini Tattoo', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },
    { id: 'arta-f-pro', name: 'F-Pro', category: 'image', provider: 'ARTA', icon: <Image className="w-4 h-4" /> },

    // AUDIO MODELS (18)
    { id: 'gemini-audio', name: 'Gemini Audio', category: 'audio', provider: 'Gemini', icon: <Music className="w-4 h-4" /> },
    { id: 'scientific-style', name: 'Scientific Style', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'alloy', name: 'Alloy Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'shimmer', name: 'Shimmer Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'sage', name: 'Sage Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'cowboy', name: 'Cowboy Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'calm', name: 'Calm Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'echo', name: 'Echo Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'verse', name: 'Verse Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'onyx', name: 'Onyx Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'ballad', name: 'Ballad Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'ash', name: 'Ash Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'friendly', name: 'Friendly Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'nova', name: 'Nova Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'fable', name: 'Fable Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'noir-detective', name: 'Noir Detective', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'patient-teacher', name: 'Patient Teacher', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },
    { id: 'coral', name: 'Coral Voice', category: 'audio', provider: 'OpenAIFM', icon: <Music className="w-4 h-4" /> },

    // MULTIMODAL MODELS (4)
    { id: 'multimodal-gemini-1.5-pro', name: 'Gemini 1.5 Pro', category: 'multimodal', provider: 'TeachAnything', icon: <Brain className="w-4 h-4" /> },
    { id: 'multimodal-gemini-1.5-flash', name: 'Gemini 1.5 Flash', category: 'multimodal', provider: 'TeachAnything', icon: <Brain className="w-4 h-4" /> },
    { id: 'multimodal-free2gpt-flash', name: 'Gemini 1.5 Flash', category: 'multimodal', provider: 'Free2GPT', icon: <Brain className="w-4 h-4" /> },
    { id: 'multimodal-free2gpt-pro', name: 'Gemini 1.5 Pro', category: 'multimodal', provider: 'Free2GPT', icon: <Brain className="w-4 h-4" /> }
  ];

  const categoryColors = {
    text: 'from-blue-500 to-cyan-400',
    code: 'from-green-500 to-emerald-400',
    image: 'from-purple-500 to-pink-400',
    audio: 'from-orange-500 to-red-400',
    research: 'from-indigo-500 to-purple-500',
    multimodal: 'from-teal-500 to-blue-500'
  };

  const categoryEmojis = {
    text: '📝',
    code: '💻',
    image: '🖼️',
    audio: '🔊',
    research: '🔍',
    multimodal: '🌀'
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings({...settings, theme});
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl glass-effect border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Settings className="w-5 h-5" />
            Настройки
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <Label className="text-lg font-semibold mb-3 block text-primary">Тема оформления</Label>
            <ThemeToggle theme={settings.theme} onThemeChange={handleThemeChange} />
          </div>

          {/* Personal Information */}
          <div>
            <Label className="text-lg font-semibold mb-3 block text-primary">Персональная информация</Label>
            <Textarea
              placeholder="Расскажите о себе, чтобы ИИ лучше понимал ваши запросы..."
              value={settings.personalInfo}
              onChange={(e) => setSettings({...settings, personalInfo: e.target.value})}
              className="min-h-20 bg-muted/50 border-border"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Эта информация поможет ИИ давать более персонализированные ответы
            </p>
          </div>

          {/* AI Model Selection */}
          <div>
            <Label className="text-lg font-semibold mb-3 block text-primary">ИИ Модель</Label>
            <Select value={settings.aiModel} onValueChange={(value) => setSettings({...settings, aiModel: value})}>
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border max-h-64">
                {Object.entries(
                  allAiModels.reduce((acc, model) => {
                    if (!acc[model.category]) acc[model.category] = [];
                    acc[model.category].push(model);
                    return acc;
                  }, {} as Record<string, typeof allAiModels>)
                ).map(([category, models]) => (
                  <div key={category}>
                    <div className={`px-3 py-2 text-xs font-semibold bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} bg-clip-text text-transparent uppercase tracking-wider`}>
                      {categoryEmojis[category as keyof typeof categoryEmojis]} {category.toUpperCase()} ({models.length})
                    </div>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="hover:bg-accent">
                        <div className="flex items-center gap-2">
                          {model.icon}
                          <span className="font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">({model.provider})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* General Settings */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Уведомления</Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Авто-прокрутка</Label>
                <Switch
                  checked={settings.autoScroll}
                  onCheckedChange={(checked) => setSettings({...settings, autoScroll: checked})}
                />
              </div>
            </div>
          </div>

          {/* Models Stats */}
          <div className="glass-card rounded-xl p-4 border">
            <h3 className="text-lg font-semibold text-primary mb-3">Доступные модели</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-blue-500">📝 Текст: 41 модель</div>
              <div className="text-green-500">💻 Код: 35 агентов</div>
              <div className="text-purple-500">🖼️ Изображения: 28 моделей</div>
              <div className="text-orange-500">🔊 Аудио: 18 голосов</div>
              <div className="text-indigo-500">🔍 Исследования: 8 моделей</div>
              <div className="text-teal-500">🌀 Мультимодальные: 4 модели</div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-primary font-bold">ВСЕГО: 130+ моделей</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-border">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-border hover:bg-accent"
            >
              Отмена
            </Button>
            <div className="flex gap-3">
              <Button 
                variant="destructive" 
                onClick={onLogout}
                className="bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30"
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
