
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Footer } from '@/components/ui/footer';
import { Brain, Zap, Shield, Sparkles, Code, Image, Music, Search, Star, Users, Rocket, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "41 Текстовых ИИ",
      description: "От Gemini до GPT-4, включая специализированные модели для любых задач",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "35 Кодовых Агентов",
      description: "Специализированные агенты для любого языка программирования",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "28 ИИ для Изображений",
      description: "Flux, SDXL и другие модели генерации изображений",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "18 Голосовых ИИ",
      description: "Различные голоса и стили для озвучивания",
      gradient: "from-orange-500 to-red-400"
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
    { number: "130+", label: "ИИ Моделей", icon: <Brain className="w-5 h-5" /> },
    { number: "0.41с", label: "Мин. время", icon: <Zap className="w-5 h-5" /> },
    { number: "∞", label: "Возможности", icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-8">
              <Logo size="lg" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Персональный ИИ
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Более 130 различных ИИ моделей в одном месте. Создано{' '}
              <span className="text-blue-400 font-semibold">Симоновым Данилом</span>{' '}
              для себя и друзей.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-12 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-blue-400">{stat.icon}</div>
                    <span className="text-3xl font-bold text-white">{stat.number}</span>
                  </div>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={onGetStarted}
              className="apple-blue text-white px-8 py-4 text-lg rounded-2xl shadow-lg apple-hover smooth-transition font-semibold"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Начать использовать
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-8 apple-hover smooth-transition group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 smooth-transition shadow-lg`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Access Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="glass-card p-8 apple-hover smooth-transition">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Базовый доступ</h3>
              </div>
              <ul className="text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Простая регистрация
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Основные ИИ модели
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Ограниченные функции
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  20 сообщений в день
                </li>
              </ul>
              <span className="text-green-400 font-semibold text-lg">Бесплатно</span>
            </Card>

            <Card className="glass-card p-8 apple-hover smooth-transition relative overflow-hidden border-blue-500/50">
              <div className="absolute top-4 right-4">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Премиум доступ</h3>
              </div>
              <ul className="text-gray-200 space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Все 130+ ИИ моделей
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Безлимитные сообщения
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Загрузка файлов
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Голосовой ввод/вывод
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Приоритетная поддержка
                </li>
              </ul>
              <span className="text-purple-400 font-semibold text-lg">По ключу доступа</span>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
