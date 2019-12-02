import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.hydrate( 
    <App initialContests={window.initialData.contests} />,
    document.getElementById('root')
);