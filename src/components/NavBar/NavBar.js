import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import NavBarIcon from './NavBarIcon';
import { MovieDataContext } from '../../MovieDataContext';
import { BiCameraMovie, BiMovie, BiSearchAlt } from 'react-icons/bi';
import { NavLink ,useHistory,Link} from 'react-router-dom';
import Button from '../Buttons/Button';
const styles = {
	color: '#ffffff',
	
};

function NavBar () {
	const history = useHistory();
	const [search, setSearch] = useState('');
	const { Data, Category, PageButton,Api } = useContext(MovieDataContext);
	const [data, setData] = Data;
	const [category, setCategory] = Category;
	const [pageButton, setPageButton] = PageButton;

	const Navstyle = {
		color: '#B8B5FF',
		textDecoration: 'line-through',
		fontWeight: 'bold'
	};
	const FetchData = (urlData, pageno) => {
		try {
			fetch(
				`https://api.themoviedb.org/3/${urlData}/popular?api_key=${Api}&page=${pageno} `,
			)
				.then((response) => response.json())
				.then((data) => setData(data));
			setPageButton(true);
		} catch (error) {
			console.log(error + 'from nav');
			setData(data);
		}
	};

	const FetchSearchData = (e) => {
		e.preventDefault();
		fetch(
			`https://api.themoviedb.org/3/search/${category}?query=${search}&api_key=${Api}&page=1`,
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data + 'from nav');
				setData(data);
				setSearch('');
				history.push('/');
				setPageButton(false);
			})
			.catch((err) => {
				console.error(err);
				setSearch('');
			});
		/* fetch(
			`https://advanced-${category}-search.p.rapidapi.com/search/movie?query=${search}&page=1`,
			{
				method: 'GET',
				headers: {
					'x-rapidapi-key':
						'4362a2ee76msh73f8bb9f06910bbp1502a6jsnd43a18dc470c',
					'x-rapidapi-host': 'advanced-movie-search.p.rapidapi.com',
				},
			},
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data + 'from nav');
				setData(data);
				setSearch('');
			})
			.catch((err) => {
				console.error(err);
			});
		 */
	};
	return (
		<>
			<NavContanier>
				<NavIconContainer>
					<Icons>
						<Link to='/'>
							<NavBarIcon />
						</Link>
					</Icons>
					<Icons
						onClick={() => {
							setCategory('movie');
							FetchData('movie', 1);
						}}>
						<BiCameraMovie size={22} style={styles} />
						<Nav exact to='/' activeStyle={Navstyle}>
							Movies
						</Nav>
					</Icons>
					<Icons
						onClick={() => {
							setCategory('tv');
							FetchData('tv', 1);
						}}>
						<BiMovie size={22} style={styles} />
						<Nav exact to='/tv-shows' activeStyle={Navstyle}>
							Tv Shows
						</Nav>
					</Icons>
				</NavIconContainer>
				<NavSearchContainer>
					<form onSubmit={FetchSearchData}>
						<input
							type='text'
							placeholder='Search for  Movies and Tv Shows'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button type='submit'>
							<BiSearchAlt size={20} style={{ color: 'white' }} />
						</button>
					</form>
				</NavSearchContainer>
			</NavContanier>
			{pageButton && <Button />}
		</>
	);
}
export default NavBar;

const NavContanier = styled.div`
	width: 100vw;
	height: 10vh;
	background-color: #7868e6;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'Raleway', sans-serif;
	position: sticky;
	z-index: 99;
	top: 0;
	left: 0;
	@media (max-width: 600px) {
		flex-direction: column;
		height: 15%;
	}
`;
const NavIconContainer = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: nowrap;
	width: 330px;
	padding: 5px;
	@media (max-width: 600px) {
		width: 100%;
		justify-content: space-between;
	}
`;
const Icons = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 160px;
	color: white;
	cursor: pointer;
	flex-wrap: nowrap;
	margin: 0 5px;
	transition-duration: 0.3s;
	&:hover {
		transform: scale(0.9);
	}

	&:first-child {
		flex-grow: 1;
		justify-content: flex-start;
		width: 100px;
		transform: none;
	}
`;
const NavSearchContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	width: 50%;
	@media (max-width: 600px) {
		width: 100%;
		padding: 5px;
	}
	form {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button {
		padding: 6px 10px;
		margin-right: 16px;
		font-size: 16px;
		border: none;
		cursor: pointer;
		background: #b8b5ff;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
		transition-duration: 0.5s;
		&:hover {
			background: #92a8d1;
		}
		@media (max-width: 600px) {
			margin: 0;
		}
	}
	input {
		width: 100%;
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		@media (max-width: 600px) {
			border-bottom-left-radius: 5px;
			border-top-left-radius: 5px;
		}
	}
	input[type='text'] {
		padding: 8px;
		font-size: 17px;
		border: none;
		outline: none;
		font-family: 'Raleway', sans-serif;
		text-transform: capitalize;

		&::placeholder {
			font-size: 0.7rem;
			letter-spacing: 1px;
			font-family: 'Raleway', sans-serif;
			@media (max-width: 300px) {
				font-size: 0.6rem;
			}
		}
	}
`;
const Nav = styled(NavLink)`
	font-size: 0.9rem;
	padding-left: 5px;
	white-space: nowrap;
	font-weight: 300;
	letter-spacing: 1px;
	text-decoration: none;
	color: rgb(255, 255, 255);
	@media (max-width: 400px) {
		font-size: 0.6rem;
	}
`;
