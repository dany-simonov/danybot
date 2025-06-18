
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatSidebar } from '@/components/sidebar/ChatSidebar';
import { SearchModeSelector } from './SearchModeSelector';
import { ModelSelector } from './ModelSelector';
import { FileUpload } from './FileUpload';
import { Send, Bot, User } from 'lucide-react';

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
  model?: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export const ChatInterface = ({ userType, onLogout }: ChatInterfaceProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchMode, setSearchMode] = useState<'quick' | 'research'>('quick');
  const [selectedModel, setSelectedModel] = useState('TeachAnything gemini-1.5-flash');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('danybot-chats');
    const savedCurrentChatId = localStorage.getItem('danybot-current-chat');
    
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }));
      setChats(parsedChats);
      
      if (savedCurrentChatId && parsedChats.find((chat: Chat) => chat.id === savedCurrentChatId)) {
        setCurrentChatId(savedCurrentChatId);
      } else if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('danybot-chats', JSON.stringify(chats));
    }
  }, [chats]);

  // Save current chat ID whenever it changes
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('danybot-current-chat', currentChatId);
    }
  }, [currentChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChatId]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: 'Новый чат',
      messages: [{
        id: '1',
        content: `Привет! Я DanyBot - твой персональный ИИ-ассистент. ${userType === 'premium' ? 'У тебя премиум доступ, так что могу помочь с любыми задачами и обработать файлы!' : 'У тебя базовый доступ. Я помогу с общими вопросами!'}`,
        sender: 'bot',
        timestamp: new Date()
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
  };

  const getCurrentChat = (): Chat | undefined => {
    return chats.find(chat => chat.id === currentChatId);
  };

  const updateChatTitle = (chatId: string, newTitle: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title: newTitle, updatedAt: new Date() }
        : chat
    ));
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => {
      const updatedChats = prev.filter(chat => chat.id !== chatId);
      if (chatId === currentChatId) {
        if (updatedChats.length > 0) {
          setCurrentChatId(updatedChats[0].id);
        } else {
          createNewChat();
        }
      }
      return updatedChats;
    });
  };

  const generateBotResponse = (input: string, type: 'basic' | 'premium', files?: File[], mode?: 'quick' | 'research', model?: string): string => {
    const modePrefix = mode === 'research' ? 'Провожу глубокий анализ... ' : 'Быстро отвечаю: ';
    const modelInfo = model ? ` (используя ${model})` : '';
    
    const responses = {
      basic: [
        "Интересный вопрос! В базовой версии я могу дать общий ответ.",
        "Хм, думаю над этим... В премиум версии я мог бы дать более детальный анализ.",
        "Это хорошая тема для обсуждения! Расскажи больше.",
        "Понимаю твой вопрос. Базовые возможности позволяют мне помочь с общими темами."
      ],
      premium: [
        "Отличный вопрос! Давай разберем это детально. С премиум доступом я могу провести глубокий анализ.",
        "Интересная задача! Я могу предложить несколько подходов к решению используя 130+ моделей ИИ.",
        "Понял! В премиум режиме у меня есть доступ к расширенным возможностям для анализа.",
        "Хороший вопрос! Могу предложить детальное решение с учетом всех нюансов."
      ]
    };

    if (files && files.length > 0 && type === 'premium') {
      return `${modePrefix}Вижу, что ты загрузил ${files.length} файл(ов). Анализирую содержимое...${modelInfo} С премиум доступом я могу обработать различные форматы файлов и дать детальный анализ.`;
    }

    const typeResponses = responses[type];
    return modePrefix + typeResponses[Math.floor(Math.random() * typeResponses.length)] + modelInfo;
  };

  const sendMessage = async () => {
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    const currentChat = getCurrentChat();
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || 'Файлы прикреплены',
      sender: 'user',
      timestamp: new Date(),
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined,
      model: selectedModel
    };

    // Update chat title with first user message
    if (currentChat.messages.length === 1 && inputValue.trim()) {
      const newTitle = inputValue.trim().substring(0, 30) + (inputValue.trim().length > 30 ? '...' : '');
      updateChatTitle(currentChatId, newTitle);
    }

    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            updatedAt: new Date()
          }
        : chat
    ));

    setInputValue('');
    setSelectedFiles([]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, userType, selectedFiles, searchMode, selectedModel),
        sender: 'bot',
        timestamp: new Date(),
        model: selectedModel
      };
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, botResponse],
              updatedAt: new Date()
            }
          : chat
      ));
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const currentChat = getCurrentChat();
  const messages = currentChat?.messages || [];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        onNewChat={createNewChat}
        onSelectChat={setCurrentChatId}
        onUpdateChatTitle={updateChatTitle}
        onDeleteChat={deleteChat}
        currentChatId={currentChatId}
        onLogout={onLogout}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-effect border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">DanyBot</h1>
              <p className="text-sm text-muted-foreground">
                {userType === 'premium' ? '✨ Pro режим' : '🔒 Базовый режим'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
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
                      : 'glass-card'
                  } rounded-2xl`}>
                    <p className="text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs opacity-70 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      {message.model && (
                        <p className={`text-xs opacity-70 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.model}
                        </p>
                      )}
                    </div>
                  </Card>
                  
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.files.map((file, index) => (
                        <div key={index} className="text-xs text-primary glass-card rounded-lg px-3 py-2">
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
        <div className="glass-effect border-t border-border p-4">
          <div className="max-w-4xl mx-auto">
            <SearchModeSelector mode={searchMode} onModeChange={setSearchMode} />
            <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
            
            <FileUpload
              userType={userType}
              onFileSelect={handleFileSelect}
              selectedFiles={selectedFiles}
              onRemoveFile={handleRemoveFile}
            />
            
            <div className="flex space-x-2 mt-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-muted/50 border-border placeholder:text-muted-foreground focus:border-primary smooth-transition rounded-xl"
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
              <p className="text-xs text-muted-foreground mt-2">
                Базовый режим: ограниченные возможности ИИ
              </p>
            )}
            
            {userType === 'premium' && (
              <p className="text-xs text-primary mt-2">
                Pro режим: 130+ моделей, загрузка файлов, {searchMode === 'research' ? 'глубокий анализ' : 'быстрые ответы'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
