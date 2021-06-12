import React from 'react'
import DarkModeToggle from 'react-dark-mode-toggle';
import styled from 'styled-components';

const ToggleButton = ({ isDarkMode, setIsDarkMode }) => {
	return (
		<>
			<Dark onChange={setIsDarkMode} checked={isDarkMode} size={40} />
		</>
	);
};

export default ToggleButton
const Dark = styled(DarkModeToggle)`

`;