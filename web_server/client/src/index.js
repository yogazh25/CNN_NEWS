import React from 'react';
import ReactDOM from 'react-dom';

//入口变成了routes,根据react-router指定的路劲走
import { browserHistory, Router } from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);
