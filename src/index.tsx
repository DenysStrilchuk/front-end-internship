import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import './index.css';
import { routes } from './routes/routes';
import './config/i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
);
