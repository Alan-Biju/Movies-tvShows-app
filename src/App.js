import React, { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Route ,Switch} from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import storage from 'local-storage-fallback';

function App () {
	 const InintialTheme = () => {
			const Theme = storage.getItem('Theme');
			return Theme === 'true' ? true : false;
		};
		const [isDarkMode, setIsDarkMode] = useState(InintialTheme());
		useEffect(() => {
			storage.setItem('Theme', isDarkMode);
		}, [isDarkMode]);
		return (
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<AppContainer>
					<NavBar dark={isDarkMode} setDark={setIsDarkMode} />
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
						<Route path='*'>
							<Home />
						</Route>
					</Switch>
				</AppContainer>
			</ThemeProvider>
		);
}
const AppContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.background};
	position: relative;
`;
export default App;
