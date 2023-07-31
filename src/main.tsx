import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ProviderNotification from './components/providers/ProviderNotification.tsx';
import './utils/i18n/i18n.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ProviderNotification>
      <App />
    </ProviderNotification>
  </Provider>
  // </React.StrictMode>
);
