import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {SocketContext} from './component/Context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContext>

    <App />
    </SocketContext>
  </React.StrictMode>,
)
