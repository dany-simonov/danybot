
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  userType: 'basic' | 'premium';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatInterface = ({ userType }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Привет! Я DanyBot - твой персональный ИИ-ассистент. ${userType === 'premium' ? 'У тебя премиум доступ, так что могу помочь с любыми задачами!' : 'У тебя базовый доступ. Я помогу с общими вопросами!'}`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Симуляция ответа ИИ
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, userType),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (input: string, type: 'basic' | 'premium'): string => {
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

    const typeResponses = responses[type];
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Заголовок */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500">
              <AvatarFallback className="text-white">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-white font-semibold">DanyBot</h1>
              <p className="text-sm text-gray-300">
                {userType === 'premium' ? 'Премиум режим' : 'Базовый режим'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Чат */}
      <div className="flex-1 overflow-y-auto p-4">
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
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}>
                <AvatarFallback className="text-white">
                  {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              
              <Card className={`max-w-[80%] p-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white/10 backdrop-blur-lg border-white/20 text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500">
                <AvatarFallback className="text-white">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {userType === 'basic' && (
            <p className="text-xs text-gray-400 mt-2">
              Базовый режим: ограниченные возможности ИИ
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
