import React, { createContext } from "react";
import App from "./components/App";
import { createRoot } from 'react-dom/client';

import "./css/sandstone.min.css";
import "./css/style.css";
import "./css/fontawesome.all.min.css";

export const myContext = createContext();

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);