import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './reduxStore/store.jsx';
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <NextUIProvider>
        <AlertProvider template={AlertTemplate} {...options}>
        <App />
        </AlertProvider>
      </NextUIProvider>
    </Router>
  </Provider>,
)
