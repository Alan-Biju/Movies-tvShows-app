import React, { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components'
const Scroll = ({ showBelow }) => {
	

	const [show, setShow] = useState(showBelow ? false : true);

	const handleScroll = () => {
		if (window.pageYOffset > showBelow) {
			if (!show) setShow(true);
		} else {
			if (show) setShow(false);
		}
	};

	const handleClick = () => {
		scroll.scrollToTop();
	};

	useEffect(() => {
		if (showBelow) {
			window.addEventListener(`scroll`, handleScroll, { passive: false });
			return (
				() => window.removeEventListener(`scroll`, handleScroll),
				{ passive: false }
			);
		} return () => {
			window.removeEventListener(`scroll`,handleScroll); // This worked for me
		};
	});

	return (
		<>
			{show && (
				<ScrollContainer onClick={handleClick}>
                    <FaAngleUp size={25} style={ {color:'#fcfcfcfc'} }/>
				</ScrollContainer>
			)}
		</>
	);
};
export default Scroll;
const ScrollContainer = styled.div`
background:#7868E6;
width:50px;
height:50px ;
border-radius:50%;
position:fixed;
bottom:10px;
right:25px;
display:flex;
justify-content:center;
align-items:center;
transition-duration:0.5s;
&:hover{
    transform:scale(1.2)
}
`;