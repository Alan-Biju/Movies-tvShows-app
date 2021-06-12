import React, { useContext, useState,useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { MovieDataContext } from '../../MovieDataContext';

function Button() {
	const { Data, Category } = useContext(MovieDataContext);
	const [data, setData] = Data;
	// eslint-disable-next-line no-unused-vars
	const [category, setCategory] = Category;
	const [pageNo, setPageNo] = useState(1);
    useEffect(() => {
    setPageNo(1)
},[category])
	const FetchData = (urlData, pageno) => {
		try {
			fetch(
				`https://api.themoviedb.org/3/${category}/popular?api_key=84e826934d86626ac5c5d04c51830f3d&page=${pageNo+1} `,
			)
				.then((response) => response.json())
				.then((data) => setData(data));
		} catch (error) {
			setData(data);
		}
	};

    function changePrev () {
        console.log(pageNo);
		if (pageNo > 1) {
			setPageNo(pageNo - 1);
			FetchData();
		} else {
			setPageNo(1);
			FetchData();
		}
	}
	function changeNext() {
		setPageNo(pageNo + 1);
		FetchData();
	}

	return (
		<>
			<ButtonContainer>
				<button onClick={changePrev}>
					<MdKeyboardArrowLeft size={18} />
					Prev
				</button>
				<Page>{`Page ${pageNo}`}</Page>
				<button onClick={changeNext}>
					Next
					<MdKeyboardArrowRight size={18} />
				</button>
			</ButtonContainer>
		</>
	);
}

export default Button;
const ButtonContainer = styled.div`
	width: calc(100% - 300px);
	float: right;
	height: fit-content;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 30px;
	@media (max-width: 590px) {
		width: calc(100% - 280px);
		margin: 10px;
	}
	@media (max-width:510px){
		width:90%;
		margin:0 auto;
		float:none;
	}
	button {
		background: #326aeb;
		border: none;
		outline: none;
		color: white;
		width: 100px;
		height: 40px;
		font-family: 'Raleway', sans-serif;
		letter-spacing: 1px;
		font-size: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		border-radius: 3px;

		&:hover {
			background-color: #b8b5ff;
		}
		@media (max-width: 590px) {
			width: 80px;
			margin:0;
		}
	}
`;
const Page = styled.p`
	color: ${(prop) => prop.theme.MainFontColor};
	@media (max-width: 590px) {
		width: 80px;
		font-size: 0.7rem;
		text-align: center;
	}
`;
