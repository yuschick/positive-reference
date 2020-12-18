import React from 'react';
import ReactDOM from 'react-dom';
import { PCVOnline } from 'routes/Positive/PCVOnline';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PCVOnline />, div);
  ReactDOM.unmountComponentAtNode(div);
});
