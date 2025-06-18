
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { SettingsDialog } from '@/components/settings/SettingsDialog';
import { Plus, Search, MessageCircle, Settings, Trash2, Edit } from 'lucide-react';

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

interface ChatSidebarProps {
  chats: Chat[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onUpdateChatTitle: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
  currentChatId?: string;
  onLogout: () => void;
}

export const ChatSidebar = ({ 
  chats, 
  onNewChat, 
  onSelectChat, 
  onUpdateChatTitle,
  onDeleteChat,
  currentChatId, 
  onLogout 
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить этот чат?')) {
      onDeleteChat(chatId);
    }
  };

  const handleRenameChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentChat = chats.find(chat => chat.id === chatId);
    const newTitle = prompt('Новое название чата:', currentChat?.title);
    if (newTitle && newTitle.trim()) {
      onUpdateChatTitle(chatId, newTitle.trim());
    }
  };

  const getLastMessage = (chat: Chat): string => {
    const lastUserMessage = chat.messages.filter(msg => msg.sender === 'user').pop();
    return lastUserMessage?.content || 'Новый чат';
  };

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Logo size="sm" />
        <Button
          onClick={onNewChat}
          className="w-full mt-4 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Новый чат
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50" />
          <Input
            placeholder="Поиск чатов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1">
          {filteredChats.map((chat) => (
            <Card
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 cursor-pointer transition-colors group hover:bg-sidebar-accent/50 ${
                currentChatId === chat.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'bg-transparent text-sidebar-foreground'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <h3 className="text-sm font-medium truncate">{chat.title}</h3>
                  </div>
                  <p className="text-xs opacity-70 truncate">{getLastMessage(chat)}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {chat.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleRenameChat(chat.id, e)}
                    className="w-6 h-6 p-0 hover:bg-sidebar-accent"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="w-6 h-6 p-0 hover:bg-destructive/20 text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={() => setSettingsOpen(true)}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="w-4 h-4 mr-2" />
          Настройки
        </Button>
      </div>

      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onLogout={onLogout}
      />
    </div>
  );
};
