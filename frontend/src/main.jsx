import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './reduxStore/store.jsx';
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <NextUIProvider>
        <App />
        <ToastContainer />
      </NextUIProvider>
    </Router>
  </Provider>,
)
