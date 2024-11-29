import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { msalConfig } from './config/auth';
import Layout from './components/Layout';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <div className="min-h-screen bg-dark text-white">
            <Layout />
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      </MsalProvider>
  );
}

export default App;