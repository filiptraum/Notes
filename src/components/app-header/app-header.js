import React from 'react';

import './app-header.scss';

const AppHeader = ({posts, liked}) => {
    return (
        <div className = "appHeader">
            <h2>Notes</h2>
            <p>
                posts: <span>{posts}</span>, 
                liked: <span>{liked}</span>.
            </p>
        </div>
    )
};

export default AppHeader;