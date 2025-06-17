
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
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "35 Кодовых Агентов",
      description: "Специализированные агенты для любого языка программирования",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "28 ИИ для Изображений",
      description: "Flux, SDXL и другие модели генерации изображений",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "18 Голосовых ИИ",
      description: "Различные голоса и стили для озвучивания",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Глубокий Поиск",
      description: "8 топовых моделей для исследований и анализа",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безопасность",
      description: "Двухуровневая система доступа с ключами",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "120+", label: "ИИ Моделей", icon: <Brain className="w-5 h-5" /> },
    { number: "0.41с", label: "Мин. время", icon: <Zap className="w-5 h-5" /> },
    { number: "∞", label: "Возможности", icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent_50%)]"></div>
      
      {/* Плавающие элементы */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-bounce delay-3000"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Персональный ИИ
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Более 120 различных ИИ моделей в одном месте. Создано <span className="text-purple-400 font-semibold">Симоновым Данилом</span> для себя и друзей.
          </p>
          
          {/* Статистика */}
          <div className="flex justify-center gap-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {stat.icon}
                  <span className="text-2xl font-bold text-white">{stat.number}</span>
                </div>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Начать использовать
          </Button>
        </div>

        {/* Преимущества */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Типы доступа */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Базовый доступ</h3>
            </div>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Простая регистрация</li>
              <li>• Основные ИИ модели</li>
              <li>• Ограниченные функции</li>
              <li>• 20 сообщений в день</li>
            </ul>
            <span className="text-green-400 font-semibold text-lg">Бесплатно</span>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-lg border-purple-500/30 p-8 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Премиум доступ</h3>
            </div>
            <ul className="text-gray-200 space-y-2 mb-6">
              <li>• Все 120+ ИИ моделей</li>
              <li>• Безлимитные сообщения</li>
              <li>• Загрузка файлов</li>
              <li>• Голосовой ввод/вывод</li>
              <li>• Приоритетная поддержка</li>
            </ul>
            <span className="text-purple-400 font-semibold text-lg">По ключу доступа</span>
          </Card>
        </div>

        {/* Футер */}
        <div className="text-center text-gray-400">
          <p>© 2025 DanyBot. Создано с ❤️ Симоновым Данилом</p>
        </div>
      </div>
    </div>
  );
};
