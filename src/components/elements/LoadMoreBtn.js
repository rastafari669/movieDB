import React from 'react';
import {StyledLoadMoreBtn} from '../styles/StyledLoadMoreBtn';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({text,callback}) => {
    return (
        <StyledLoadMoreBtn type="button" onClick={callback}>
            {text}
        </StyledLoadMoreBtn>
    )
}

LoadMoreBtn.propTypes ={
    text: PropTypes.string,
    callback:PropTypes.func,
}
