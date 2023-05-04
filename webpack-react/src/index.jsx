import './style.scss'
import React from 'react'
import App from './App'
import { createRoot } from "react-dom/client";
// import type from './types'

// console.log(type)
//

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
