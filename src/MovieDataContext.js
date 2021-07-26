import React, { createContext, useEffect, useState } from 'react';
export const MovieDataContext = createContext();
const MovieProvider = (props) => {
	const Api = process.env.REACT_APP_API_KEY;
	const [category,setCategory]=useState('movie')
	const [data, setData] = useState('');
	const [button,setButton]=useState(true)
    useEffect(() => {
        console.log('Every body say aaa from context Api');
	try {
        fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=${Api} `,
				)
					.then((response) => response.json())
					.then((data) => {
						setData(data);					
					});
						
        
    } catch (error) {
        console.log(error+'55')
    }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	return (
		<>
			<MovieDataContext.Provider
				value={{ Data: [data, setData], Category: [category, setCategory],PageButton:[button, setButton],Api }}>
				{props.children}
			</MovieDataContext.Provider>
		</>
	);
};

export default MovieProvider;
