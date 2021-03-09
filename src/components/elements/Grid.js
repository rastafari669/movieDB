import React from 'react';
import {StyledGrid,StyledGridContent} from '../styles/StyledGrid';
import PropTypes from 'prop-types';

//children are all the props in the Grid
export const Grid = ({header,children}) => {
    return (
        <StyledGrid>
            <h1>{header}</h1>
            <StyledGridContent>{children}</StyledGridContent>
        </StyledGrid>
    )
}

Grid.propTypes ={
    header: PropTypes.string,
    
}
