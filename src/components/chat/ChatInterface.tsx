import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatSidebar } from '@/components/sidebar/ChatSidebar';
import { SearchModeSelector } from './SearchModeSelector';
import { ModelSelector } from './ModelSelector';
import { FileUpload } from './FileUpload';
import { Send, Bot, User } from 'lucide-react';
import { workingProviders } from '@/providers/workingProviders';
import ReactMarkdown from 'react-markdown';
import { toast } from '@/components/ui/use-toast';
import './ChatInterface.css';

interface FileWithUrl extends File {
  url?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  files?: FileWithUrl[];
  model?: string;
  category: string;
}

interface GeneratedFile {
  url: string;
  name: string;
  type: string;
}

interface ChatInterfaceProps {
  userType: 'basic' | 'premium';
  onLogout: () => void;
}

interface ApiResponse {
  response: string;
  files?: GeneratedFile[];
  error?: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const CATEGORIES = [
  { value: 'text', label: 'Текст' },
  { value: 'image', label: 'Картинки' },
  { value: 'audio', label: 'Аудио' },
  { value: 'research', label: 'Ресерч' },
];

const MODEL_COLORS = [
  'bg-gradient-to-br from-blue-600 to-cyan-500',
  'bg-gradient-to-br from-purple-600 to-pink-500',
  'bg-gradient-to-br from-gray-700 to-gray-400',
  'bg-gradient-to-br from-green-600 to-teal-400',
  'bg-gradient-to-br from-yellow-500 to-orange-400',
];

const getModelLogo = (model: string) => {
  if (model.toLowerCase().includes('gemini')) return '🤖';
  if (model.toLowerCase().includes('gpt')) return '🧠';
  if (model.toLowerCase().includes('image')) return '🖼️';
  if (model.toLowerCase().includes('audio')) return '🔊';
  if (model.toLowerCase().includes('research')) return '🔍';
  return '✨';
};

export const ChatInterface = ({ userType, onLogout }: ChatInterfaceProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithUrl[]>([]);
  const [searchMode, setSearchMode] = useState<'quick' | 'research'>('quick');
  const [selectedModel, setSelectedModel] = useState('TeachAnything gemini-1.5-flash');
  const [category, setCategory] = useState<string>('text');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [model, setModel] = useState('gemini-1.5-flash');

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

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentChatId]);

  useEffect(() => {
    // Сброс модели при смене категории
    setSelectedModel('');
  }, [category]);

  // Прокрутка вниз при добавлении сообщения
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: 'Новый чат',
      messages: [{
        id: '1',
        content: `Привет! Я DanyBot - твой персональный ИИ-ассистент. ${userType === 'premium' ? 'У тебя премиум доступ, так что могу помочь с любыми задачами и обработать файлы!' : 'У тебя базовый доступ. Я помогу с общими вопросами!'}`,
        sender: 'bot',
        timestamp: new Date(),
        category: 'text'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      files: selectedFiles,
      model: model,
      category: category
    };

    setChatMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setSelectedFiles([]);

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('message', inputValue);
      formData.append('provider', availableModels.find(m => m.value === model)?.provider || '');
      formData.append('model', model);
      formData.append('category', category);
      
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Сервер не отвечает или endpoint не найден (404)');
        }
        throw new Error(`Ошибка при отправке сообщения: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        files: data.files?.map((f) => ({
          ...f,
          url: f.url
        })) as FileWithUrl[],
        model: model,
        category: category
      };

      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : 'Произошла ошибка при обращении к ИИ'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files.map(f => ({ ...f } as FileWithUrl))]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const currentChat = getCurrentChat();
  const messages = currentChat?.messages || [];

  const availableModels = useMemo(() => {
    return workingProviders
      .filter(p => p.category === category)
      .map(p => ({
        value: p.model,
        label: `${p.provider} ${p.model}`,
        provider: p.provider,
        key: `${p.provider}-${p.model}`
      }));
  }, [category]);

  return (
    <div className="flex flex-col h-full max-h-screen">
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
      <div className="flex-1 flex flex-col max-h-[70vh]">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-background" style={{ minHeight: 0 }}>
          <div className="max-w-4xl mx-auto space-y-6">
            {chatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground opacity-60 select-none">
                <Bot className="w-10 h-10 mb-2" />
                <div>Начните диалог с ИИ — выберите модель и напишите сообщение!</div>
              </div>
            )}
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className="flex flex-col items-center">
                  <div className={`rounded-full w-10 h-10 flex items-center justify-center shadow-lg ${message.sender === 'user' ? 'bg-gradient-to-br from-blue-500 to-cyan-400' : 'bg-gradient-to-br from-gray-300 to-gray-100'}`}> 
                    {message.sender === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-blue-500" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">{message.timestamp.toLocaleTimeString()}</span>
                </div>
                <div className={`flex flex-col max-w-[70vw] min-w-[120px] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                  style={{
                    background: message.sender === 'user' ? 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)' : 'rgba(255,255,255,0.95)',
                    color: message.sender === 'user' ? '#fff' : '#222',
                    borderRadius: 18,
                    boxShadow: message.sender === 'user' ? '0 2px 8px #2563eb33' : '0 2px 8px #0001',
                    padding: 16,
                    marginBottom: 8
                  }}
                >
                  <div className="flex items-center mb-2 gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{message.model}</span>
                    <span className="text-xs text-muted-foreground">{message.category}</span>
                  </div>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2">
                      {message.files.map((file, i) => (
                        <a key={i} href={file.url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block">{file.name || 'Файл'}</a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start animate-fade-in">
                <div className="flex flex-col items-center">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center shadow-lg bg-gradient-to-br from-gray-300 to-gray-100">
                    <Bot className="w-6 h-6 text-blue-500 animate-spin-slow" />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex flex-col max-w-[70vw] min-w-[120px] items-start"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    color: '#222',
                    borderRadius: 18,
                    boxShadow: '0 2px 8px #0001',
                    padding: 16,
                    marginBottom: 8
                  }}
                >
                  <div className="flex items-center mb-2 gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">ИИ</span>
                    <span className="text-xs text-muted-foreground">думает...</span>
                  </div>
                  <span className="flex items-center gap-2"><span>Думаю...</span><span className="inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin align-middle"></span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto px-2 pb-4 pt-2 sticky bottom-0 bg-background z-10">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              placeholder="Введите сообщение..."
              className="flex-1"
            />
            <FileUpload userType={userType} onFileSelect={handleFileSelect} selectedFiles={selectedFiles} onRemoveFile={handleRemoveFile} />
            <Button type="submit" disabled={isLoading || !model || (!inputValue.trim() && selectedFiles.length === 0)}>
              <Send />
            </Button>
          </form>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col space-y-4 mb-4 mt-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="p-2 rounded-lg border border-blue-700 bg-blue-950 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
        >
          <option value="">Выберите модель</option>
          {availableModels.map((m) => (
            <option key={m.key} value={m.value}>
              {getModelLogo(m.value)} {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
