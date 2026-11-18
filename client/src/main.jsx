import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { PantryProvider } from './context/PantryContext';
import { NavigationProvider } from './context/NavigationContext';
import { BrandLoader } from './components/ui/BrandLoader';
import App from './App';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <PantryProvider>
            <NavigationProvider>
              <BrandLoader />
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3500,
                  style: {
                    background: '#244B39',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 10px 25px -3px rgba(36, 75, 57, 0.25)',
                    border: '1px solid rgba(217, 154, 56, 0.3)'
                  },
                  success: {
                    iconTheme: {
                      primary: '#D99A38',
                      secondary: '#244B39'
                    }
                  }
                }}
              />
            </NavigationProvider>
          </PantryProvider>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
