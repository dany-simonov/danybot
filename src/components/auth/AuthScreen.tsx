
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Key, Mail, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuthenticate: (userType: 'basic' | 'premium') => void;
}

export const AuthScreen = ({ onAuthenticate }: AuthScreenProps) => {
  const [accessKey, setAccessKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Демо ключи для тестирования
  const validKeys = ['a7f9d3b2e6c8g5h1', 'x2k9m4l8n3q7w5z1'];

  const handleKeyLogin = async () => {
    setLoading(true);
    
    // Симуляция проверки ключа
    setTimeout(() => {
      if (validKeys.includes(accessKey)) {
        toast({
          title: "Добро пожаловать в премиум!",
          description: "Доступ к расширенным функциям получен",
        });
        onAuthenticate('premium');
      } else {
        toast({
          title: "Неверный ключ доступа",
          description: "Проверьте правильность введенного ключа",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleBasicLogin = async () => {
    setLoading(true);
    
    // Симуляция базовой аутентификации
    setTimeout(() => {
      if (email) {
        toast({
          title: "Добро пожаловать!",
          description: "Базовый доступ активирован",
        });
        onAuthenticate('basic');
      } else {
        toast({
          title: "Ошибка",
          description: "Введите email для продолжения",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Логотип и заголовок */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-xl">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DanyBot</h1>
          <p className="text-gray-300">Персональный ИИ-ассистент</p>
          <p className="text-sm text-gray-400 mt-2">Создано Симоновым Данилом</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Войти в систему</CardTitle>
            <CardDescription className="text-gray-300">
              Выберите способ входа для доступа к функциям DanyBot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="premium" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger value="premium" className="text-white data-[state=active]:bg-purple-500">
                  Премиум
                </TabsTrigger>
                <TabsTrigger value="basic" className="text-white data-[state=active]:bg-blue-500">
                  Базовый
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="premium" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Ключ доступа
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Введите 16-символьный ключ"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      maxLength={16}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Пример: a7f9d3b2e6c8g5h1 или x2k9m4l8n3q7w5z1
                  </p>
                </div>
                <Button 
                  onClick={handleKeyLogin}
                  disabled={loading || !accessKey}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  {loading ? 'Проверка...' : 'Войти с ключом'}
                </Button>
              </TabsContent>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleBasicLogin}
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  {loading ? 'Вход...' : 'Базовый доступ'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>Премиум доступ включает расширенные ИИ модели и функции</p>
        </div>
      </div>
    </div>
  );
};
