import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Demo() {
    const [moviesdata, setmoviesdata] = useState([]);

    const moviedata = async () => {
        try {
            const data = await axios.get('http://www.omdbapi.com/?s=avengers&plot=full&page=5&apikey=f4a20640&type');
            setmoviesdata(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        moviedata();
    }, [])
    console.log(moviesdata, moviesdata.Title);
    return (
        <>
            {
                moviesdata.Search?.map((moviedata)=>(
                    <div className='flex'>
                        <p className='text-white text-2xl'>{moviedata.Title}</p>
                        <img src={moviedata.Poster} className='border border-red-400 w-60 h-60'/>
                    </div>

                ))
            }
        </>
    )
}

export default Demo
//ba07bef3506ab382f0009401b2b4a970 -- API key of TMDB

// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTA3YmVmMzUwNmFiMzgyZjAwMDk0MDFiMmI0YTk3MCIsInN1YiI6IjY1NDExY2EzNDU1N2EwMDBjNmI0YTlkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rPVFxYREhVQrCA04cOV_RZS3AuCl3GexhBgBH6rLulI
// The Movie Database (TMDB)

//https://api.themoviedb.org/3/configuration?api_key=ba07bef3506ab382f0009401b2b4a970

// imageBaseURL = https://image.tmdb.org/t/p/
//https://image.tmdb.org/t/p/w1280/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg

//https://api.themoviedb.org/3/genre/movie/list?api_key=ba07bef3506ab382f0009401b2b4a970&language=hindi-IN --List of movies type
//https://api.themoviedb.org/3/movie/popular?api_key=ba07bef3506ab382f0009401b2b4a970 -- popular movies