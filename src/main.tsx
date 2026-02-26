import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'
import { store } from './store/index.ts';
import { AuthProvider, ThemeProvider } from './context';
import { LoadingProvider } from './context/LoadingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <LoadingProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </LoadingProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
