import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ReviewProvider } from './context/ReviewContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ReviewProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReviewProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
