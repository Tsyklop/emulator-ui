import { attachLogger } from 'effector-logger';

import ReactDOM from 'react-dom/client';
import {StrictMode} from "react";

import {appStarted} from '~/shared/config/init';
import {App} from './application';

import './index.css';

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

attachLogger();

appStarted();
root.render(<StrictMode><App/></StrictMode>);
