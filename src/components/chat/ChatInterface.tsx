import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/ui/logo';
import { SettingsDialog } from '@/components/settings/SettingsDialog';
import { FileUpload } from './FileUpload';
import { Send, Bot, User, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  userType: 'basic' | 'premium';
  onLogout: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  files?: File[];
}

export const ChatInterface = ({ userType, onLogout }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Привет! Я DanyBot - твой персональный ИИ-ассистент. ${userType === 'premium' ? 'У тебя премиум доступ, так что могу помочь с любыми задачами и обработать файлы!' : 'У тебя базовый доступ. Я помогу с общими вопросами!'}`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (input: string, type: 'basic' | 'premium', files?: File[]): string => {
    const responses = {
      basic: [
        "Интересный вопрос! В базовой версии я могу дать общий ответ.",
        "Хм, думаю над этим... В премиум версии я мог бы дать более детальный анализ.",
        "Это хорошая тема для обсуждения! Расскажи больше.",
        "Понимаю твой вопрос. Базовые возможности позволяют мне помочь с общими темами."
      ],
      premium: [
        "Отличный вопрос! Давай разберем это детально. С премиум доступом я могу провести глубокий анализ.",
        "Интересная задача! Я могу предложить несколько подходов к решению.",
        "Понял! В премиум режиме у меня есть доступ к расширенным возможностям для анализа.",
        "Хороший вопрос! Могу предложить детальное решение с учетом всех нюансов."
      ]
    };

    if (files && files.length > 0 && type === 'premium') {
      return `Вижу, что ты загрузил ${files.length} файл(ов). Анализирую содержимое... С премиум доступом я могу обработать различные форматы файлов и дать детальный анализ.`;
    }

    const typeResponses = responses[type];
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || 'Файлы прикреплены',
      sender: 'user',
      timestamp: new Date(),
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedFiles([]);
    setIsTyping(true);

    // Симуляция ответа ИИ
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, userType, selectedFiles),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black cyber-grid">
      {/* Неоновый фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
      
      {/* Заголовок */}
      <div className="bg-black/80 neon-border border-b p-4 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center space-x-2">
            <div className="text-right mr-4">
              <p className="text-sm text-neon-cyan font-mono">
                {userType === 'premium' ? '✨ Премиум режим' : '🔒 Базовый режим'}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-neon-cyan hover:bg-neon-cyan/10 neon-border"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-neon-purple hover:bg-neon-purple/10 neon-border"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Чат */}
      <div className="flex-1 overflow-y-auto p-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 animate-fade-in ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <Avatar className={`w-8 h-8 ${
                message.sender === 'bot' 
                  ? 'bg-gradient-to-r from-neon-purple to-neon-cyan neon-glow' 
                  : 'bg-gradient-to-r from-neon-green to-neon-cyan neon-glow'
              }`}>
                <AvatarFallback className="text-black font-bold">
                  {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col max-w-[80%]">
                <Card className={`p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan to-blue-400 text-black neon-glow'
                    : 'bg-black/80 neon-border text-white'
                }`}>
                  <p className={`text-sm ${message.sender === 'user' ? 'font-bold' : 'font-mono'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs opacity-70 mt-1 ${message.sender === 'user' ? 'text-black/70' : 'text-gray-400'} font-mono`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
                
                {/* Отображение файлов */}
                {message.files && message.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.files.map((file, index) => (
                      <div key={index} className="text-xs text-neon-cyan font-mono bg-black/50 neon-border rounded px-2 py-1">
                        📎 {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <Avatar className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-cyan neon-glow">
                <AvatarFallback className="text-black font-bold">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-black/80 neon-border p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-neon-pulse"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-neon-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-neon-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода */}
      <div className="bg-black/80 neon-border border-t p-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FileUpload
            userType={userType}
            onFileSelect={handleFileSelect}
            selectedFiles={selectedFiles}
            onRemoveFile={handleRemoveFile}
          />
          
          <div className="flex space-x-2 mt-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-black/50 neon-border text-white placeholder:text-gray-500 font-mono"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={(!inputValue.trim() && selectedFiles.length === 0) || isTyping}
              className="bg-gradient-to-r from-neon-purple to-neon-cyan hover:from-neon-purple/80 hover:to-neon-cyan/80 text-black font-bold neon-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {userType === 'basic' && (
            <p className="text-xs text-gray-400 mt-2 font-mono">
              Базовый режим: ограниченные возможности ИИ
            </p>
          )}
          
          {userType === 'premium' && (
            <p className="text-xs text-neon-cyan mt-2 font-mono">
              Премиум режим: 130+ моделей, загрузка файлов
            </p>
          )}
        </div>
      </div>

      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onLogout={onLogout}
      />
    </div>
  );
};
