import React from 'react';

import {StyledHeroImage} from '../styles/StyledHeroImage';
import PropTypes from 'prop-types';


//the props here are from the component StyledHeroImage billow


export const HeroImage = ({image,title,text}) => {
    return (
        <StyledHeroImage image={image}>
            <div className="heroimage-content">
            <div className="heroimage-text">

            <h1>{title}</h1>
            <p>{text}</p>
            </div>
            </div>
        </StyledHeroImage>
    )
}

HeroImage.propTypes={
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
}
