import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <DndProvider debugMode={true} backend={HTML5Backend}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DndProvider>,
  document.getElementById('root')
);
