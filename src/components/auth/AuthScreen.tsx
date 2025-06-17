
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

const PREMIUM_KEYS = [
  'x9k2m5p8n3q7w1e4',
  'z7f6j9l2v8c4b1n5',
  't3g8h5k9m2x6w4e7'
];

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
    
    // Проверка ключа доступа
    setTimeout(() => {
      if (PREMIUM_KEYS.includes(accessKey)) {
        onAuthenticate('premium');
        toast({
          title: "Премиум доступ активирован!",
          description: "Все 130+ моделей разблокированы",
        });
      } else {
        toast({
          title: "Неверный ключ",
          description: "Проверьте правильность введенного ключа",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black cyber-grid">
      {/* Неоновый фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
      
      {/* Кнопка назад */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-6 left-6 text-neon-cyan hover:bg-neon-cyan/10 neon-border z-20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold neon-text mb-2">Добро пожаловать!</h1>
          <p className="text-gray-400 font-mono">Выберите тип доступа</p>
        </div>

        <div className="space-y-6">
          {/* Базовый доступ */}
          <Card className="bg-black/80 neon-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neon-cyan neon-text">
                <UserPlus className="w-5 h-5" />
                Базовый доступ
              </CardTitle>
              <CardDescription className="text-gray-300 font-mono text-sm">
                Простая регистрация с ограниченными функциями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBasicAuth} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-neon-cyan font-mono">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-black/50 neon-border text-white placeholder:text-gray-500 font-mono"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-neon-cyan to-blue-400 hover:from-neon-cyan/80 hover:to-blue-400/80 text-black font-bold"
                  disabled={loading}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? 'Вход...' : 'Войти с базовым доступом'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Премиум доступ */}
          <Card className="bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 neon-border relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-6 h-6 text-yellow-400 animate-neon-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neon-purple neon-text">
                <Crown className="w-5 h-5 text-yellow-400" />
                Премиум доступ
              </CardTitle>
              <CardDescription className="text-gray-300 font-mono text-sm">
                Полный доступ ко всем 130+ ИИ моделям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePremiumAuth} className="space-y-4">
                <div>
                  <Label htmlFor="accessKey" className="text-neon-purple font-mono">Ключ доступа</Label>
                  <Input
                    id="accessKey"
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="x9k2m5p8n3q7w1e4"
                    className="bg-black/50 neon-border text-white placeholder:text-gray-500 font-mono"
                    maxLength={16}
                  />
                  <p className="text-xs text-gray-400 mt-1 font-mono">
                    16-символьный ключ от Данила
                  </p>
                  <div className="mt-2 text-xs text-neon-cyan font-mono">
                    <p>Доступные ключи для тестирования:</p>
                    <div className="bg-black/30 p-2 rounded mt-1 space-y-1">
                      {PREMIUM_KEYS.map((key, index) => (
                        <div key={index} className="text-neon-green">• {key}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan hover:from-neon-purple/80 hover:to-neon-cyan/80 text-black font-bold neon-glow"
                  disabled={loading}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {loading ? 'Проверка...' : 'Активировать премиум'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6 font-mono">
          Создано с ❤️ Симоновым Данилом
        </p>
      </div>
    </div>
  );
};
