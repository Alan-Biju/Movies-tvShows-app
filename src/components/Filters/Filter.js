import React from 'react';
import styled from 'styled-components';
import FilterCard from './FilterCard';
import GenreList from './GenerList';
import { Sorts, Genres } from './FilterData';

function Filter() {
	return (
		<>
			<FilterContainer>
				<FilterCard datas={Sorts} name='Sort' />
				<GenreList datas={Genres} name='Genres' />
			</FilterContainer>
		</>
	);
}

export default Filter;
const FilterContainer = styled.div`
	position: sticky;
	top: 10vh;
	min-width: 240px;
	width: 240px;
	height: fit-content;
	padding: 5px 0;
	@media (max-width: 510px) {
		width: 95vw;
		position: static;
		top: 0;
	}
`;
