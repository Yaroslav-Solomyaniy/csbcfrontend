import React from 'react';
import "./navigationButton.css"

const NavigationButton = () => {
    return (
        <button className="navigationButton">
            <svg className="navButtonSvg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 19H5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 5H5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 15L4 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 9L4 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </button>
    );
};

export default NavigationButton;