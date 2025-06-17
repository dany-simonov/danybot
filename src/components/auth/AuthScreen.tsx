
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { Footer } from '@/components/ui/footer';
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
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-300 hover:text-white hover:bg-white/10 smooth-transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <Logo size="lg" className="justify-center mb-6" />
            <h1 className="text-4xl font-bold text-white mb-3">Добро пожаловать!</h1>
            <p className="text-gray-400">Выберите тип доступа</p>
          </div>

          <div className="space-y-6 animate-slide-up">
            {/* Basic Access */}
            <Card className="glass-card apple-hover smooth-transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <UserPlus className="w-5 h-5 text-blue-400" />
                  Базовый доступ
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Простая регистрация с ограниченными функциями
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBasicAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-zinc-800/50 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-400 smooth-transition"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl smooth-transition apple-hover"
                    disabled={loading}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {loading ? 'Вход...' : 'Войти с базовым доступом'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Premium Access */}
            <Card className="glass-card apple-hover smooth-transition border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Премиум доступ
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Полный доступ ко всем 130+ ИИ моделям
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePremiumAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="accessKey" className="text-gray-300">Ключ доступа</Label>
                    <Input
                      id="accessKey"
                      type="text"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      placeholder="x9k2m5p8n3q7w1e4"
                      className="bg-zinc-800/50 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 smooth-transition"
                      maxLength={16}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      16-символьный ключ от Данила
                    </p>
                    <div className="mt-3 text-xs text-gray-400">
                      <p className="mb-2">Доступные ключи для тестирования:</p>
                      <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/10 space-y-1">
                        {PREMIUM_KEYS.map((key, index) => (
                          <div key={index} className="text-green-400 font-mono">• {key}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl smooth-transition apple-hover"
                    disabled={loading}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    {loading ? 'Проверка...' : 'Активировать премиум'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Создано с ❤️ Симоновым Данилом
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
