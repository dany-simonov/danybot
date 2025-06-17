
import React, { useState } from 'react';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'basic' | 'premium'>('basic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!isAuthenticated ? (
        <AuthScreen 
          onAuthenticate={(type) => {
            setIsAuthenticated(true);
            setUserType(type);
          }} 
        />
      ) : (
        <ChatInterface userType={userType} />
      )}
    </div>
  );
};

export default Index;
