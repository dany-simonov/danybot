
import React, { useState, useEffect } from 'react';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { LandingPage } from '@/components/landing/LandingPage';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'auth' | 'chat'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'basic' | 'premium'>('basic');

  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleAuthenticate = (type: 'basic' | 'premium') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentScreen('chat');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('landing');
  };

  if (currentScreen === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentScreen === 'auth') {
    return <AuthScreen onAuthenticate={handleAuthenticate} onBack={() => setCurrentScreen('landing')} />;
  }

  return <ChatInterface userType={userType} onLogout={handleLogout} />;
};

export default Index;
