import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImageView from './ImageView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageView smallImage={'http://xxxx'} largeImage={'sdsds'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
