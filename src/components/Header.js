import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ pageHeader }) => {
    return ( 
        <h2 className = "header text-center"> 
            { pageHeader } 
        </h2>
    );
};

Header.propTypes = {
    pageHeader: PropTypes.string,
};

export default Header;