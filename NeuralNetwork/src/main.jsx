// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import Body from './Body'
import './index.css'
import Titulo from './Titulo'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Titulo />
      <Body />
    </NextUIProvider>
  </React.StrictMode>
)

