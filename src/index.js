import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/Components/App';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faChevronRight, faTimes, faSearch} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight, faTimes, faSearch);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);