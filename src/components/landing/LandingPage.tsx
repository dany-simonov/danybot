
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Brain, Zap, Shield, Sparkles, Code, Image, Music, Search, Star, Users, Rocket } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "41 Текстовых ИИ",
      description: "От Gemini до GPT-4, включая специализированные модели",
      gradient: "from-neon-cyan to-blue-400"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "35 Кодовых Агентов",
      description: "Специализированные агенты для любого языка программирования",
      gradient: "from-neon-green to-emerald-400"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "28 ИИ для Изображений",
      description: "Flux, SDXL и другие модели генерации изображений",
      gradient: "from-neon-purple to-pink-400"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "18 Голосовых ИИ",
      description: "Различные голоса и стили для озвучивания",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Глубокий Поиск",
      description: "8 топовых моделей для исследований и анализа",
      gradient: "from-indigo-400 to-neon-purple"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безопасность",
      description: "Двухуровневая система доступа с ключами",
      gradient: "from-red-400 to-neon-pink"
    }
  ];

  const stats = [
    { number: "130+", label: "ИИ Моделей", icon: <Brain className="w-5 h-5" /> },
    { number: "0.41с", label: "Мин. время", icon: <Zap className="w-5 h-5" /> },
    { number: "∞", label: "Возможности", icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black cyber-grid">
      {/* Неоновый фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
      
      {/* Плавающие неоновые элементы */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neon-purple/30 rounded-full blur-xl animate-neon-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-neon-cyan/30 rounded-full blur-xl animate-neon-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-neon-green/30 rounded-full blur-xl animate-neon-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
            Персональный ИИ
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Более 130 различных ИИ моделей в одном месте. Создано <span className="text-neon-purple font-semibold neon-text">Симоновым Данилом</span> для себя и друзей.
          </p>
          
          {/* Статистика */}
          <div className="flex justify-center gap-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {stat.icon}
                  <span className="text-2xl font-bold text-neon-cyan neon-text">{stat.number}</span>
                </div>
                <span className="text-sm text-gray-400 font-mono">{stat.label}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-neon-purple to-neon-cyan hover:from-neon-purple/80 hover:to-neon-cyan/80 text-black px-8 py-3 text-lg rounded-xl neon-glow transform hover:scale-105 transition-all duration-200 font-bold"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Начать использовать
          </Button>
        </div>

        {/* Преимущества */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black/80 neon-border p-6 hover:neon-glow transition-all duration-300 group">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neon-purple mb-2 neon-text">{feature.title}</h3>
              <p className="text-gray-300 font-mono text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Типы доступа */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-black/80 neon-border p-8 hover:neon-glow transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-2xl font-bold text-neon-cyan neon-text">Базовый доступ</h3>
            </div>
            <ul className="text-gray-300 space-y-2 mb-6 font-mono text-sm">
              <li>• Простая регистрация</li>
              <li>• Основные ИИ модели</li>
              <li>• Ограниченные функции</li>
              <li>• 20 сообщений в день</li>
            </ul>
            <span className="text-neon-green font-semibold text-lg neon-text">Бесплатно</span>
          </Card>

          <Card className="bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 neon-border p-8 hover:neon-glow transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current animate-neon-pulse" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-neon-purple" />
              <h3 className="text-2xl font-bold text-neon-purple neon-text">Премиум доступ</h3>
            </div>
            <ul className="text-gray-200 space-y-2 mb-6 font-mono text-sm">
              <li>• Все 130+ ИИ моделей</li>
              <li>• Безлимитные сообщения</li>
              <li>• Загрузка файлов</li>
              <li>• Голосовой ввод/вывод</li>
              <li>• Приоритетная поддержка</li>
            </ul>
            <span className="text-neon-purple font-semibold text-lg neon-text">По ключу доступа</span>
          </Card>
        </div>

        {/* Футер */}
        <div className="text-center text-gray-400 font-mono">
          <p>© 2025 DanyBot. Создано с ❤️ Симоновым Данилом</p>
        </div>
      </div>
    </div>
  );
};
