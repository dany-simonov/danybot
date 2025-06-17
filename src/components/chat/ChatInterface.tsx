
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/ui/logo';
import { Footer } from '@/components/ui/footer';
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
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="glass-effect border-b border-white/10 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center space-x-3">
            <div className="text-right mr-4">
              <p className="text-sm text-blue-400 font-medium">
                {userType === 'premium' ? '✨ Премиум режим' : '🔒 Базовый режим'}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-white/10 smooth-transition"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-white/10 smooth-transition"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 animate-fade-in ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <Avatar className={`w-10 h-10 ${
                message.sender === 'bot' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-gradient-to-r from-green-500 to-cyan-500'
              } shadow-lg`}>
                <AvatarFallback className="text-white font-bold">
                  {message.sender === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col max-w-[80%]">
                <Card className={`p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'glass-card text-white'
                } rounded-2xl`}>
                  <p className="text-sm leading-relaxed">
                    {message.content}
                  </p>
                  <p className={`text-xs opacity-70 mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
                
                {message.files && message.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.files.map((file, index) => (
                      <div key={index} className="text-xs text-blue-400 glass-card rounded-lg px-3 py-2">
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
              <Avatar className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                <AvatarFallback className="text-white font-bold">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <Card className="glass-card p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-effect border-t border-white/10 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <FileUpload
            userType={userType}
            onFileSelect={handleFileSelect}
            selectedFiles={selectedFiles}
            onRemoveFile={handleRemoveFile}
          />
          
          <div className="flex space-x-3 mt-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-zinc-800/50 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 smooth-transition rounded-xl"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={(!inputValue.trim() && selectedFiles.length === 0) || isTyping}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg apple-hover smooth-transition rounded-xl px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {userType === 'basic' && (
            <p className="text-xs text-gray-500 mt-2">
              Базовый режим: ограниченные возможности ИИ
            </p>
          )}
          
          {userType === 'premium' && (
            <p className="text-xs text-blue-400 mt-2">
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
