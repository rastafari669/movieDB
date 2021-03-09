import React from 'react';
import {StyledMovieThumb} from '../styles/StyledMovieThumb';
import {Link} from '@reach/router';
import PropTypes from 'prop-types';

export const MovieThumb = ({image,movieId,clickable}) => {
    return (
        <StyledMovieThumb>
           {clickable ? (
               <Link to={`/${movieId}`}>
               <img className="clickable" src={image} alt="moviethumb"/>
               </Link>
           ) :(
               <img src={image} alt="moviethumb"/>
           )}
        </StyledMovieThumb>
    )
}

MovieThumb.propTypes ={
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool,
}
