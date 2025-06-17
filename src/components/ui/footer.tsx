
import React from 'react';
import { Github, Mail, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900/50 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-8">
            <a
              href="https://t.me/dany_simonov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 smooth-transition apple-hover"
            >
              <MessageCircle className="w-5 h-5" />
              <span>@dany_simonov</span>
            </a>
            
            <a
              href="mailto:dany.ssimon2007@yandex.ru"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 smooth-transition apple-hover"
            >
              <Mail className="w-5 h-5" />
              <span>dany.ssimon2007@yandex.ru</span>
            </a>
            
            <a
              href="https://github.com/dany-simonov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 smooth-transition apple-hover"
            >
              <Github className="w-5 h-5" />
              <span>github.com/dany-simonov</span>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2025 DanyBot. Создано с ❤️ Симоновым Данилом</p>
            <p className="text-gray-500 text-xs mt-1">Персональный ИИ-ассистент для друзей</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
