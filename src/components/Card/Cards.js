import React,{useContext} from 'react';
import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { MovieDataContext } from '../../MovieDataContext';
import { MovieData } from './BackupData';
const Cards = ({ Movies}) => {
		const {  Category } = useContext(MovieDataContext);
	const [category] = Category;
	return (
		<>
			<CardMainContainer>
				{Movies && Movies.length > 0 && Movies
					? Movies.map((movie, index) => {
							const day = new Date(
								movie.release_date || movie.first_air_date,
							).toLocaleString('en-US', {
								day: '2-digit',
							});
							const year = new Date(
								movie.release_date || movie.first_air_date,
							).getFullYear();
							const month = new Date(
								movie.release_date || movie.first_air_date,
							).toLocaleString('en-US', {
								month: 'short',
							});
							const release_date = `${month} ${day} , ${year}`;
							return (
								<CardContainer key={index}>
									<img
										src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										onError={(e) => {
											e.target.src = 'Alt.jpg';
										}}
										alt='Sorry it Was a Img'
									/>

									<h2>{movie.original_title || movie.name}</h2>
									<BottomDetails to={`/info/${category}/${movie.id}`}>
										<TextContainer>
											<p>{`Rating:${movie.vote_average}`}</p>
											<p>{`Date:${release_date}`}</p>
										</TextContainer>
										<RiArrowRightSLine />
									</BottomDetails>
								</CardContainer>
							);
					  })
					: MovieData.map((movie, index) => {
							const day = new Date(
								movie.release_date || movie.first_air_date,
							).toLocaleString('en-US', {
								day: '2-digit',
							});
							const year = new Date(
								movie.release_date || movie.first_air_date,
							).getFullYear();
							const month = new Date(
								movie.release_date || movie.first_air_date,
							).toLocaleString('en-US', {
								month: 'short',
							});
							const release_date = `${month} ${day} , ${year}`;
							return (
								<CardContainer key={index}>
									<img
										src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										onError={(e) => {
											e.target.src = 'Alt.jpg';
										}}
										alt='Sorry it Was a Img'
									/>

									<h2>{movie.original_title || movie.name}</h2>
									<BottomDetails to={`/info/${category}/${movie.id}`}>
										<TextContainer>
											<p>{`Rating:${movie.vote_average}`}</p>
											<p>{`Date:${release_date}`}</p>
										</TextContainer>
										<RiArrowRightSLine />
									</BottomDetails>
								</CardContainer>
							);
					  })}
			</CardMainContainer>
		</>
	);
};

export default Cards;
const CardMainContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-gap: 25px;
	grid-auto-flow: dense;
	padding: 10px;
	@media (max-width: 510px) {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;
const CardContainer = styled.div`
	width: 230px;
	height: 390px;
	background-color: ${(prop) => prop.theme.MainBackground};
	overflow: hidden;
	border-radius: 10px;
	border: 1px solid ${(prop) => prop.theme.Cardborder};
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	transition-duration: 0.3s;
	&:hover {
		transform: scale(1.03);
	}

	img {
		width: 100%;
		height: 320px;
	}
	h2 {
		font-size: 0.74rem;
		text-align: center;
		font-weight: 600;
		padding: 0px;
		white-space: nowrap;
		color: ${(prop) => prop.theme.MainFontColor};
	}
`;
const TextContainer = styled.div`
	padding: 3px;
	font-size: 0.6rem;
	font-weight: 600;
	color: ${(prop) => prop.theme.secondaryFontColor};
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	letter-spacing: 1px;
	cursor: pointer;
	p {
		font-size: 0.5rem;
		padding: 3px;
		font-weight: bold;
		padding-left: 5px;
		font-family: 'Raleway', sans-serif;
	}
`;

const BottomDetails = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	text-decoration:none;
	
`;
