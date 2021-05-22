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
function GenerList({ datas, name }) {
	const [drop, setDrop] = useState(false);
	const { Data, Category, PageButton ,Api} = useContext(MovieDataContext);
	const [data, setData] = Data;
	// eslint-disable-next-line no-unused-vars
	const [pageButton, setPageButton] = PageButton;

	// eslint-disable-next-line no-unused-vars
	const [category, setCategory] = Category;
	const FetchData = (id) => {
		try {
			fetch(
				`https://api.themoviedb.org/3/discover/${category}?api_key=${Api}&with_genres=${id}  `,
			)
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setPageButton(false);
				});
		} catch (error) {
			console.log(error + 'from nav');
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
					<MdKeyboardArrowDown style={{ color: '#000000' }} size={25} />
				) : (
					<MdKeyboardArrowRight style={{ color: '#000000' }} size={25} />
				)}
			</FilterCardContainer>
			{drop ? (
				<>
					{datas.map((data, idx) => {
						return (
							<FilterCardContainer
								key={idx}
								onClick={() => {
									FetchData(data.id);
								}}>
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

export default GenerList;
export const FilterCardContainer = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px 16px;
	border: 1px solid #e3e3e3;
	cursor: pointer;
	transition-duration: 0.3s;
	p {
		font-size: 0.7rem;
		font-weight: 400;
		letter-spacing: 1px;
		text-transform: capitalize;
	}
	&:hover {
		background-color: #b8b5ff;
	}
	&:first-child,
	&:last-child {
		background-color: transparent;
	}
`;
const Title = styled.h5`
	font-size: 0.8rem;
	font-weight: 600;
`;
