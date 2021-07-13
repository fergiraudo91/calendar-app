import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';

console.log(process.env.REACT_APP_URL);

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);

