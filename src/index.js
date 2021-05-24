import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MovieProvider from './MovieDataContext';
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
			<MovieProvider>
				<Router>
					
							<App />
					
				</Router>
			</MovieProvider>,
	document.getElementById('root'),
);
