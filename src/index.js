import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller'
import {Container} from 'cerebral/react'
import App from './App';
import './index.css';

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
);
