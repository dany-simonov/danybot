
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft, Mail, Key, UserPlus, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuthenticate: (userType: 'basic' | 'premium') => void;
  onBack: () => void;
}

export const AuthScreen = ({ onAuthenticate, onBack }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBasicAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Симуляция авторизации
    setTimeout(() => {
      if (email) {
        onAuthenticate('basic');
        toast({
          title: "Добро пожаловать!",
          description: "Вы вошли с базовым доступом",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handlePremiumAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Симуляция проверки ключа
    setTimeout(() => {
      if (accessKey.length === 16) {
        onAuthenticate('premium');
        toast({
          title: "Премиум доступ активирован!",
          description: "Все функции разблокированы",
        });
      } else {
        toast({
          title: "Неверный ключ",
          description: "Ключ должен содержать 16 символов",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_70%)]"></div>
      
      {/* Кнопка назад */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-6 left-6 text-white hover:bg-white/10 z-20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h1>
          <p className="text-gray-400">Выберите тип доступа</p>
        </div>

        <div className="space-y-6">
          {/* Базовый доступ */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <UserPlus className="w-5 h-5" />
                Базовый доступ
              </CardTitle>
              <CardDescription className="text-gray-300">
                Простая регистрация с ограниченными функциями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBasicAuth} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? 'Вход...' : 'Войти с базовым доступом'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Премиум доступ */}
          <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="w-5 h-5 text-yellow-400" />
                Премиум доступ
              </CardTitle>
              <CardDescription className="text-gray-300">
                Полный доступ ко всем 120+ ИИ моделям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePremiumAuth} className="space-y-4">
                <div>
                  <Label htmlFor="accessKey" className="text-white">Ключ доступа</Label>
                  <Input
                    id="accessKey"
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="a7f9d3b2e6c8g5h1"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 font-mono"
                    maxLength={16}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    16-символьный ключ от Данила
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={loading}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {loading ? 'Проверка...' : 'Активировать премиум'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Создано с ❤️ Симоновым Данилом
        </p>
      </div>
    </div>
  );
};
