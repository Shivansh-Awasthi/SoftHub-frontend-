import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdsComponent = () => {
    const location = useLocation();

    useEffect(() => {
        const loadAds = () => {
            const adContainer = document.getElementById("container-e290ae8dd1069eb91a4dfef6ac586535");
            if (adContainer) {
                // Clear previous ad content
                adContainer.innerHTML = "";

                // Create a new script element for the ad
                const script = document.createElement("script");
                script.src = "//pl24836806.profitablecpmrate.com/e290ae8dd1069eb91a4dfef6ac586535/invoke.js";
                script.async = true;
                script.setAttribute("data-cfasync", "false");

                script.onerror = () => {
                    console.error('Error loading ad script');
                };

                script.onload = () => {
                    console.log('Ad script loaded successfully');
                };

                // Append the script to the ad container
                adContainer.appendChild(script);
            }
        };

        // Load ads on route change
        loadAds();

        return () => {
            const adContainer = document.getElementById("container-e290ae8dd1069eb91a4dfef6ac586535");
            if (adContainer) {
                adContainer.innerHTML = ""; // Cleanup on unmount
            }
        };
    }, [location]);

    return (
        <div>
            <div id="container-e290ae8dd1069eb91a4dfef6ac586535"></div>
        </div>
    );
};

export default AdsComponent;