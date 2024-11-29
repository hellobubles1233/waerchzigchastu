import React from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/auth';
import { LogIn } from 'lucide-react';
import Navigation from './Navigation';
import { AppRoutes } from '../routes';

const Layout: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-primary">Valaiscom AG | Wärchzigchastu 2 / Alpha</h1>
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            <LogIn size={20} />
            Mit Microsoft amäldu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark">
      <Navigation />
      <main className="flex-1 overflow-auto p-6 bg-dark">
        <AppRoutes />
      </main>
    </div>
  );
};

export default Layout;