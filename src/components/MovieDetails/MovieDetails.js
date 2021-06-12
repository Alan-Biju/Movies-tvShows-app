import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDataContext } from '../../MovieDataContext';
import styled from 'styled-components';
import {
	FaPlay,
	FaCaretRight,
	FaStar,
	FaRegQuestionCircle,
} from 'react-icons/fa';
import { MdDateRange, MdLanguage } from 'react-icons/md';
import Cast from './Cast';
import Youtube from './Youtube';
import ErrorMessage from './ErrorMessage';

const MovieDetails = () => {
	const { PageButton, Api } = useContext(MovieDataContext);
	// eslint-disable-next-line no-unused-vars
	const [Button, setButton] = PageButton;
	const [details, setDetails] = useState('');
	const [casts, setCasts] = useState('');
	const [trailer, setTrailer] = useState(false);

	const { id, category } = useParams();

	const movieDetails = () => {
		setButton(false);
		try {
			fetch(
				`https://api.themoviedb.org/3/${category}/${id}?api_key=${Api}&append_to_response=videos `,
			)
				.then((response) => response.json())
				.then((data) => {
					setDetails(data);
				});
		} catch (error) {
			console.log(error + 'from details');
		}

		try {
			fetch(
				`https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${Api}`,
			)
				.then((response) => response.json())
				.then((data) => {
					setCasts(data);
				});
		} catch (error) {
			console.log(error + 'from cast');
		}
	};
	useEffect(() => {
		movieDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const day = new Date(
		details.release_date || details.first_air_date,
	).toLocaleString('en-US', {
		day: '2-digit',
	});
	const year = new Date(
		details.release_date || details.first_air_date,
	).getFullYear();
	const month = new Date(
		details.release_date || details.first_air_date,
	).toLocaleString('en-US', {
		month: 'short',
	});
	return (
		<>
			<MovieDetailsContanier>
				<MovieImgContanier>
					<img
						src={`http://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
						onError={(e) => {
							e.target.src = '/backdrop.jpg';
						}}
						alt='Poster Img'
					/>
					<ButtonContainer onClick={() => setTrailer(!trailer)}>
						<a href='##'>Watch Trailer</a>
						<span>
							<FaPlay style={{ color: '#ffffff' }} />
						</span>
					</ButtonContainer>
				</MovieImgContanier>
				<MovieTextContainer>
					<TextBox>
						<h2>{details.title || details.original_name}</h2>
						<a href={details.homepage}>
							More Info <FaCaretRight />{' '}
						</a>
						<div>
							<Rating>
								<FaStar
									size={18}
									style={{
										color: '  #ffc500',
									}}
								/>
								<p>{`${details.vote_average || '0'}/10`}</p>
							</Rating>
							<Release>
								<MdDateRange style={{ color: '#c21500' }} />
								{details.release_date || details.first_air_date ? (
									<p>{`${month} ${day}  ${year}`}</p>
								) : (
									<p>{` Coming Soon`}</p>
								)}
							</Release>
							<Status>
								<FaRegQuestionCircle style={{ color: '#4b6cb7' }} />
								<p>{details.status || 'Not mentioned'}</p>
							</Status>
							<Language>
								<MdLanguage size={18} style={{ color: '#009B77' }} />
								<p>
									{ (details && details.spoken_languages.length>0 && details.spoken_languages[0].english_name) || 'Unknown  😎' }
								</p>
							</Language>
						</div>
					</TextBox>
					<OverViewContainer>
						<OverView>
							<h2>OverView :</h2>
							<p>{details.overview}</p>
							<h3>{`Tagline: # ${details.tagline} .`}</h3>
						</OverView>
					</OverViewContainer>
					<Productions>
						{details &&
							details.production_companies.map((production, idx) => {
								return production.logo_path == null ? (
									''
								) : (
									<img
										key={idx}
										src={`http://image.tmdb.org/t/p/w500/${production.logo_path}`}
										alt='Logo'
										onError={(e) => {
											e.target.src =
												'http://image.tmdb.org/t/p/w500/fycMZt242LVjagMByZOLUGbCvv3.png';
										}}
									/>
								);
							})}
					</Productions>
					<Cast casts={casts} />
				</MovieTextContainer>
			</MovieDetailsContanier>
			{details &&
				trailer &&
				(details.videos.results.length > 0 ? (
					<Youtube
						link={details.videos.results[0].key}
						state={[trailer, setTrailer]}
					/>
				) : (
					<ErrorMessage state={[trailer, setTrailer]} />
				))}
		</>
	);
};

export default MovieDetails;

const MovieDetailsContanier = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 2%;
	@media (max-width: 950px) {
		flex-direction: column;
	}
`;

const MovieImgContanier = styled.div`
	max-width: 500px;
	min-width: 235px;
	@media (max-width: 950px) {
		margin: 0 auto;
		padding-bottom: 3%;
	}

	img {
		width: 100%;
		object-fit: contain;
	}
`;

const ButtonContainer = styled.div`
	width: 100%;
	height: 50px;
	border: 2px solid #b8b5ff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	transition: all 0.5s ease-in-out;
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		height: 90%;
		text-decoration: none;
		color: #5038f0;
		font-weight: bold;
	}
	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
	}
	&:hover {
		background-color: #7868e6;
		cursor: pointer;

		a {
			display: none;
		}
		span {
			display: flex;
		}
	}
`;
const MovieTextContainer = styled.div`
	width: calc(100% - 500px);
	padding: 0 2%;
	@media (max-width: 950px) {
		width: 100%;
	}
`;
const TextBox = styled.div`
	h2 {
		color: ${(prop) => prop.theme.MainFontColor};
		font-family: 'Raleway', sans-serif;
		font-weight: 600;
		letter-spacing: 1px;
		font-size: 1.5rem;
	}
	a {
		text-decoration: none;
		font-size: 0.7rem;
		color: #8480fa;
		display: flex;
		align-items: center;
		padding: 1% 0;
	}
	div {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
	}
`;
const Rating = styled.div`
	display: flex;
	align-items: center;
	width: 150px;
	height: 100%;
	p {
		padding: 0 2%;
		font-family: 'Raleway', sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		color: ${(prop) => prop.theme.MainFontColor};
		@media (max-width: 500px) {
			font-size: 0.6rem;
		}
	}
`;
const Release = styled(Rating)``;
const Status = styled(Rating)``;
const Language = styled(Rating)``;

const OverViewContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const OverView = styled.div`
	width: 70%;
	h2 {
		font-family: 'Raleway', sans-serif;
		letter-spacing: 1px;
		font-size: 1rem;
		font-weight: 600;
		padding: 5% 0 3% 0;
		color: ${(prop) => prop.theme.MainFontColor};
	}
	h3,
	p {
		font-family: 'Poppins', sans-serif;
		font-size: 0.7rem;
		letter-spacing: 1px;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
	h3 {
		padding: 3% 0;
	}
	@media (max-width: 950px) {
		width: 90%;
	}
`;
const Productions = styled.div`
	img {
		padding: 0 1%;
		width: 60px;
	}
`;
