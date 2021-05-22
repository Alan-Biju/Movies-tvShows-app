import React from 'react';
import styled from 'styled-components';
import { VscChromeClose } from 'react-icons/vsc';

function Youtube({ link, state }) {
    const [trailer, setTrailer] = state;
   
	return (
		<YoutubeContainer>
			<iframe
				width='560'
				height='315'
				src={`https://www.youtube.com/embed/${link}`}
				title='YouTube video player'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen></iframe>
			<Close onClick={()=>setTrailer(!trailer)}>
				<VscChromeClose size={30} style={{ color: 'black' }} />
			</Close>
		</YoutubeContainer>
	);
}

export default Youtube;

const Close = styled.div`
	position: fixed;
	top: 12vh;
	right: 2%;
	border: 1px solid #fcfcfcfc;
	background: #fcfcfcfc;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition-duration: 0.6s;
	&:hover {
		transform: scale(0.9);
	}
	@media (max-width: 600px) {
		top: 20vh;
	}
`;

const YoutubeContainer = styled.div`
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
