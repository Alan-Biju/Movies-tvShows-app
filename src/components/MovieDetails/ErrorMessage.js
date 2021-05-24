import React from 'react';
import styled,{keyframes} from 'styled-components';
import { VscChromeClose } from 'react-icons/vsc';

function ErrorMessage ({ state }) {
	const [trailer, setTrailer] = state;
    
	return (
		<>
			<ErrorContainer>
				<VscChromeClose
					size={20}
                    style={ { color:'#ffffff' ,cursor:'pointer' } }
					onClick={() => setTrailer(!trailer)}
				/>

				<p>Sorry No trailer available 😔</p>
			</ErrorContainer>
		</>
	);
}

export default ErrorMessage;
const MoveIn = keyframes`
from{
    transform:translateX(100%);

}to{
    transform:translateX(0%);
}
`;
const ErrorContainer = styled.div`
	width: 230px;
	max-width: 230px;
	height: 70px;
	background-color: #ff5042;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-radius: 5px;
	position: fixed;
	top: calc(5% + 65px );
	right: 0%;
	animation: 0.8s ${MoveIn} cubic-bezier(0.51, 0.92, 0.24, 1.15);
	p {
		color: #ffffff;
		letter-spacing: 1px;
		font-size: 0.7rem;
		font-family: 'Raleway', sans-serif;
		font-weight: bold;
	}
`;
