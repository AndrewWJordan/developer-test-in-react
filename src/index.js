import React from 'react';
import ReactDOM from 'react-dom';
import UserListing from './UserListing';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserListing />, document.getElementById('root'));

serviceWorker.unregister();
