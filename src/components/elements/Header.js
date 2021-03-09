import React from 'react'
import RMDBLogo from '../images/reactMovie_logo.png';
import TMDLogo from '../images/tmdb_logo.svg';
import {Link} from '@reach/router';

import {StyledHeader,StyledRMDBLogo,StyledTMDBLogo} from '../styles/StyledHeader';

//1.learn how to create basic style components
//2.Learn how to handle props in styled components
//3.Create a global style with styled components



export const Header = () => {
    return (
        <StyledHeader>
            <div className="header-content">
                <Link to ="/">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo"/>
                </Link>
                <StyledTMDBLogo src={TMDLogo} alt="tmdb-logo"/>
            </div>
        </StyledHeader>
    )
}
