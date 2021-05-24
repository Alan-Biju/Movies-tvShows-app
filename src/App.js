import React from 'react';
import styled from 'styled-components';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Route,Switch } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {
	return (
		<AppContainer>
			<NavBar />
			<Switch>
				<Route path='/' default exact>
					<Home />
				</Route>
				<Route path='/tv-shows' exact>
					<Home />
				</Route>
				<Route path='/info/:category/:id' exact>
					<MovieDetails />
				</Route>
				<Route path="*">
					<Home />
				</Route>
			</Switch>
		</AppContainer>
	);
}
const AppContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background:#fcfcf9;	
	position: relative;
`;
export default App;
