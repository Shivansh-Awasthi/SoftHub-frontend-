import React, { useEffect } from 'react';


const GiscusComments = ({ objectId }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'Admin-ToxicGames/toxicgames');
        script.setAttribute('data-repo-id', 'R_kgDONQVRhg');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDONQVRhs4CkU7x');
        script.setAttribute('data-mapping', 'specific');
        script.setAttribute('data-term', objectId);
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'noborder_gray');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('data-loading', 'lazy');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [objectId]);

    return <div className="giscus" />;
};

export default GiscusComments;
