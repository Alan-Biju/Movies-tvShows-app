import React, { useState, useContext } from 'react';
import { MovieDataContext } from '../../MovieDataContext';

import styled from 'styled-components';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	MdArrowForward,
} from 'react-icons/md';
const styles = {
	color: '#5f5858',
};
function FilterCard({ datas, name }) {
	const [drop, setDrop] = useState(false);
	const { Data, Category, PageButton ,Api} = useContext(MovieDataContext);
	const [data, setData] = Data;
	
	// eslint-disable-next-line no-unused-vars
	const [category, setCategory] = Category;
	// eslint-disable-next-line no-unused-vars
	const [pageButton, setPageButton] = PageButton;

	const FetchData = (urlData) => {
		console.log('innav');
		try {
			fetch(
				`https://api.themoviedb.org/3/${category}/${urlData}?api_key=${Api}  `,
			)
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setPageButton(false);
				});
		} catch (error) {
			setData(data);
		}
	};
	
	return (
		<>
			<FilterCardContainer
				onClick={() => {
					setDrop(!drop);
				}}>
				<Title>{name}</Title>
				{drop ? (
					<Down   size={25} />
				) : (
					<Right  size={25} />
				)}
			</FilterCardContainer>
			{drop ? (
				<>
					{datas.map((data, idx) => {
						let urlData;
						if (category === 'movie') {
							urlData = data.urlData;
						}
						else {
							urlData=data.urlDataTv;
						}
						
						return (
							<FilterCardContainer key={ idx } onClick={()=>{FetchData(urlData);}}>
								<p>{data.title}</p>
								<MdArrowForward style={styles} size={15} />
							</FilterCardContainer>
						);
					})}
				</>
			) : (
				''
			)}
		</>
	);
}

export default FilterCard;
export const FilterCardContainer = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px 16px;
	border: 1px solid ${(prop) => prop.theme.Cardborder};
	cursor: pointer;
	transition-duration: 0.3s;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.sideBarBackground};
	p {
		font-size: 0.7rem;
		font-weight: 400;
		letter-spacing: 1px;
		text-transform: capitalize;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
	&:hover {
		background-color: ${(prop) => prop.theme.HoverSideBar};
	}
	&:first-child,
	&:last-child {
		background-color: transparent;
	}
`;
const Title = styled.h5`
	font-size: 0.8rem;
	font-weight: 600;
	color: ${(prop) => prop.theme.MainFontColor};
`;
const Down = styled(MdKeyboardArrowDown)`
	color: ${(prop) => prop.theme.MainFontColor};
`;
const Right = styled(MdKeyboardArrowRight)`
	color: ${(prop) => prop.theme.MainFontColor};
`;