
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Bot } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
}

export const SettingsDialog = ({ open, onOpenChange, onLogout }: SettingsDialogProps) => {
  const [personalInfo, setPersonalInfo] = useState('');

  const models = {
    text: [
      { name: 'TeachAnything gemini-1.5-flash', time: '0.50 с' },
      { name: 'TeachAnything gemini-1.5-pro', time: '0.52 с' },
      { name: 'Cohere command-r7b-arabic-02-2025', time: '0.97 с' },
      { name: 'Cohere command-r7b-12-2024', time: '0.98 с' },
      { name: 'LambdaChat apriel-5b-instruct', time: '1.05 с' },
      { name: 'Cohere command-r', time: '1.08 с' },
      { name: 'Qwen-3-30b-a3b', time: '1.20 с' },
      { name: 'OIVSCode gpt-4.1-mini', time: '1.23 с' },
      { name: 'Qwen-3-8b', time: '1.27 с' },
      { name: 'LambdaChat deepseek-llama3.3-70b', time: '1.32 с' },
      { name: 'Cohere command-a-03-2025', time: '1.35 с' },
      { name: 'Cohere command-r-08-2024', time: '1.36 с' },
      { name: 'LambdaChat lfm-40b', time: '1.67 с' },
      { name: 'Cohere command-r-plus', time: '1.83 с' },
      { name: 'OIVSCode gpt-4o-mini', time: '1.84 с' },
      { name: 'LambdaChat llama3.3-70b-instr-fp8', time: '1.85 с' },
      { name: 'LambdaChat qwen25-coder-32b-instr', time: '1.91 с' },
      { name: 'Qwen-3-0.6b', time: '2.04 с' },
      { name: 'Perplexity sonar', time: '2.05 с' },
      { name: 'Perplexity sonar-pro', time: '2.19 с' },
      { name: 'WeWordle gpt-4', time: '2.22 с' },
      { name: 'Cohere command-r-plus-08-2024', time: '2.24 с' },
      { name: 'Qwen-2.5', time: '2.40 с' },
      { name: 'LambdaChat llama3.3-70b-instr-fp8', time: '2.49 с' },
      { name: 'Yqcloud gpt-4', time: '2.69 с' },
      { name: 'Free2GPT gemini-1.5-pro', time: '2.93 с' },
      { name: 'Qwen-3-1.7b', time: '3.08 с' },
      { name: 'Free2GPT gemini-1.5-flash', time: '3.24 с' },
      { name: 'Qwen-2.5-max', time: '3.43 с' },
      { name: 'Qwen-3-4b', time: '3.97 с' },
      { name: 'Qwen-2-72b', time: '4.21 с' },
      { name: 'LambdaChat qwen3-32b-fp8', time: '4.22 с' },
      { name: 'Qwen-3-235b', time: '6.14 с' },
      { name: 'Perplexity r1-1776', time: '6.37 с' },
      { name: 'LambdaChat deepseek-r1', time: '6.66 с' },
      { name: 'Qwen-3-14b', time: '7.31 с' },
      { name: 'Qwen-3-32b', time: '7.65 с' },
      { name: 'Perplexity sonar-reasoning', time: '9.54 с' },
      { name: 'Perplexity sonar-reasoning-pro', time: '21.24 с' },
      { name: 'LambdaChat hermes-3-llama-3.1-405b-fp8', time: '41.09 с' },
      { name: 'LambdaChat llama3.1-nemotron-70b-instr', time: '84.89 с' }
    ],
    code: [
      { name: 'gpt-4', time: '1.74 с' },
      { name: 'FastAPI Agent', time: '1.82 с' },
      { name: 'gpt-4o', time: '1.86 с' },
      { name: 'Builder Agent', time: '1.99 с' },
      { name: 'Firebase Agent', time: '2.02 с' },
      { name: 'Flask Agent', time: '2.11 с' },
      { name: 'gpt-4.1-nano', time: '2.12 с' },
      { name: 'AngularJS Agent', time: '2.20 с' },
      { name: 'gpt-4o-mini', time: '2.22 с' },
      { name: 'Flutter Agent', time: '2.23 с' },
      { name: 'Erlang Agent', time: '2.24 с' },
      { name: 'DigitalOcean Agent', time: '2.25 с' },
      { name: 'Swift Agent', time: '2.31 с' },
      { name: 'MongoDB Agent', time: '2.41 с' },
      { name: 'JavaScript Agent', time: '2.43 с' },
      { name: 'Xcode Agent', time: '2.46 с' },
      { name: 'Go Agent', time: '2.48 с' },
      { name: 'Git Agent', time: '2.54 с' },
      { name: 'HTML Agent', time: '2.58 с' },
      { name: 'PyTorch Agent', time: '2.59 с' },
      { name: 'Android Agent', time: '2.72 с' },
      { name: 'gpt-4.1-mini', time: '2.73 с' },
      { name: 'Java Agent', time: '2.93 с' },
      { name: 'Gitlab Agent', time: '3.12 с' },
      { name: 'Next.js Agent', time: '3.24 с' },
      { name: 'Python Agent', time: '3.32 с' },
      { name: 'blackboxai', time: '3.62 с' },
      { name: 'Electron Agent', time: '3.75 с' },
      { name: 'Bitbucket Agent', time: '3.82 с' },
      { name: 'Azure Agent', time: '3.90 с' },
      { name: 'Docker Agent', time: '4.31 с' },
      { name: 'Godot Agent', time: '4.81 с' },
      { name: 'React Agent', time: '5.10 с' },
      { name: 'Google Cloud Agent', time: '5.56 с' },
      { name: 'Heroku Agent', time: '5.83 с' }
    ],
    image: [
      { name: 'ImageLabs sdxl-turbo', time: '8.68 с' },
      { name: 'ARTA katayama-mix-xl', time: '14.07 с' },
      { name: 'ARTA new-school', time: '14.23 с' },
      { name: 'ARTA anima-pencil-xl', time: '14.43 с' },
      { name: 'ARTA flame-design', time: '14.54 с' },
      { name: 'BlackForest flux-dev', time: '15.45 с' },
      { name: 'ARTA anything-xl', time: '16.16 с' },
      { name: 'ARTA f-dev', time: '16.23 с' },
      { name: 'ARTA flux-dev', time: '16.23 с' },
      { name: 'ARTA trash-polka', time: '16.23 с' },
      { name: 'ARTA pony-xl', time: '16.25 с' },
      { name: 'ARTA yamers-realistic-xl', time: '16.26 с' },
      { name: 'ARTA Watercolor', time: '16.39 с' },
      { name: 'ARTA embroidery-tattoo', time: '16.46 с' },
      { name: 'ARTA realistic-tattoo', time: '16.50 с' },
      { name: 'ARTA playground-xl', time: '16.54 с' },
      { name: 'ARTA realistic-stock-xl', time: '16.63 с' },
      { name: 'ARTA on-limbs-black', time: '16.64 с' },
      { name: 'ARTA photographic', time: '17.16 с' },
      { name: 'ARTA death-metal', time: '18.22 с' },
      { name: 'ARTA neo-traditional', time: '18.39 с' },
      { name: 'ARTA red-and-black', time: '18.51 с' },
      { name: 'ARTA kawaii', time: '19.25 с' },
      { name: 'ARTA biomech', time: '20.96 с' },
      { name: 'ARTA flux-pro', time: '25.14 с' },
      { name: 'ARTA flux', time: '32.19 с' },
      { name: 'ARTA mini-tattoo', time: '64.63 с' },
      { name: 'ARTA f-pro', time: '250.87 с' }
    ],
    audio: [
      { name: 'Gemini audio', time: '0.41 с' },
      { name: 'OpenAIFM scientific_style', time: '0.94 с' },
      { name: 'OpenAIFM alloy', time: '1.07 с' },
      { name: 'OpenAIFM shimmer', time: '1.11 с' },
      { name: 'OpenAIFM sage', time: '1.17 с' },
      { name: 'OpenAIFM cowboy', time: '1.27 с' },
      { name: 'OpenAIFM calm', time: '1.29 с' },
      { name: 'OpenAIFM echo', time: '1.36 с' },
      { name: 'OpenAIFM verse', time: '1.38 с' },
      { name: 'OpenAIFM onyx', time: '1.39 с' },
      { name: 'OpenAIFM ballad', time: '1.46 с' },
      { name: 'OpenAIFM ash', time: '1.54 с' },
      { name: 'OpenAIFM friendly', time: '1.64 с' },
      { name: 'OpenAIFM nova', time: '1.67 с' },
      { name: 'OpenAIFM fable', time: '1.69 с' },
      { name: 'OpenAIFM noir_detective', time: '2.36 с' },
      { name: 'OpenAIFM patient_teacher', time: '3.41 с' },
      { name: 'OpenAIFM coral', time: '5.24 с' }
    ],
    multimodal: [
      { name: 'TeachAnything gemini-1.5-pro', time: '0.67 с' },
      { name: 'TeachAnything gemini-1.5-flash', time: '0.68 с' },
      { name: 'Free2GPT gemini-1.5-flash', time: '4.16 с' },
      { name: 'Free2GPT gemini-1.5-pro', time: '6.08 с' }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-sidebar border-sidebar-border">
        <DialogHeader>
          <DialogTitle className="text-sidebar-foreground">Настройки</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6">
          {/* Personal Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-sidebar-foreground" />
              <Label className="text-sidebar-foreground">Личная информация</Label>
            </div>
            <Textarea
              placeholder="Расскажите о себе, чтобы ИИ лучше понимал ваши потребности..."
              value={personalInfo}
              onChange={(e) => setPersonalInfo(e.target.value)}
              className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
              rows={3}
            />
          </div>

          {/* Models Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-sidebar-foreground" />
              <Label className="text-sidebar-foreground">Доступные модели ИИ (130+)</Label>
            </div>
            
            <ScrollArea className="h-64 w-full border border-sidebar-border rounded-lg">
              <div className="p-4 space-y-4">
                {Object.entries(models).map(([category, categoryModels]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sidebar-foreground mb-2 capitalize">
                      {category === 'text' && '📝 TEXT (41)'}
                      {category === 'code' && '💻 CODE (35)'}
                      {category === 'image' && '🖼️ IMAGE (28)'}
                      {category === 'audio' && '🔊 AUDIO (18)'}
                      {category === 'multimodal' && '🌀 MULTIMODAL (4)'}
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {categoryModels.map((model, index) => (
                        <Card key={index} className="p-2 bg-sidebar-accent border-sidebar-border">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-sidebar-foreground">{model.name}</span>
                            <Badge variant="outline" className="text-xs text-sidebar-foreground border-sidebar-border">
                              {model.time}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-sidebar-border">
            <Button 
              variant="destructive" 
              onClick={onLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
