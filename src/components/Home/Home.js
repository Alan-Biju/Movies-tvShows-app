import React, { useContext } from 'react';
import styled from 'styled-components';
import { MovieDataContext } from '../../MovieDataContext';
import Cards from '../Card/Cards';
import Filter from '../Filters/Filter';
import Scroll from '../Scroll/Scroll';
const Home = () => {
	const { Data } = useContext(MovieDataContext);
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = Data;
	const Movies = data.results;
	return (
		<>
			<HomeContainer>
				<Filter />
				<Cards Movies={Movies} />
				<Scroll showBelow={250} />
			</HomeContainer>
		</>
	);
};

export default Home;
const HomeContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-column-gap: 20px;
	scroll-behavior: smooth;
	@media (max-width: 510px) {
		grid-template-columns: auto;
		align-items: center;
		justify-content: center;
	}
`;
