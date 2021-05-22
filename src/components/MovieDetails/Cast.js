import React from 'react';
import styled from 'styled-components';
function Cast ({ casts }) {

	return (
		<>
			<CastContainer>
				<Title>Cast :</Title>
				<CastBox>
					{casts &&
						casts.cast.map((cast, index) => {
							return (
								index < 6 && (
									<CastCard key={index}>
										<img
											src={`http://image.tmdb.org/t/p/w500/${cast.profile_path}`}
											onError={(e) => {
												e.target.src = '/Avatar.png';
											}}
											alt='cast'
										/>
										<p>{cast.name}</p>
									</CastCard>
								)
							);
						})}
				</CastBox>
			</CastContainer>
		</>
	);
}

export default Cast;
const CastContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const Title = styled.p`
	font-family: 'Raleway', sans-serif;
	letter-spacing: 1px;
	font-size: 1rem;
	font-weight: 600;
	padding: 2% 0 2% 0;
`;
const CastBox = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	grid-gap: 25px;
	grid-auto-flow: dense;
	grid-row-gap: 20px;
   
`;
const CastCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 150px;
	img {
		width: 40px;
		border-radius: 5px;
		
	}
	p {
		font-size: 0.6rem;
		font-weight: 500;
		letter-spacing: 1px;
		margin: 0 0 0 5%;
		white-space: nowrap;
	}
`;
