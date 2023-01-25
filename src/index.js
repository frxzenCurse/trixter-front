import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.scss';
import App from './App';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
