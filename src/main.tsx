import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App as AntdApp } from "antd";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AntdApp>
            <App />
        </AntdApp>
    </Provider>
);
