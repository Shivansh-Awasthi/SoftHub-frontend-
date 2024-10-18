import React from 'react';
import './Loader.css'; // Adjust the path as necessary

const Loader = () => {
    return (
        <div className="loader">
            <h1>Loading...</h1>
            <div className="body">
                <div className="base">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="face"></div>
            </div>
            <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
