import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './app/store'
import ThemeProvider from './services/ThemeContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarProvider } from 'notistack'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <SnackbarProvider autoHideDuration={3000}>
            <GoogleOAuthProvider clientId={clientId}>
              <App />
            </GoogleOAuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
