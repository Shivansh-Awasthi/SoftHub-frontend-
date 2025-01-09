import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const GamePage = () => {
    const [data, setData] = useState([]);
    const itemsPerPage = 9999999; // Consider changing this for performance in production

    const handleData = async () => {
        const response = await axios.get(`${process.env.REACT_API}/api/apps/all?page=1&limit=${itemsPerPage}`);
        setData(response.data.apps);
    };

    const sanitizeTitle = (title) => {
        return title.replace(/\s+/g, '-').toLowerCase();
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div style={{ visibility: 'hidden' }}>
            {data.map((ele) => (
                <div key={ele._id}>
                    <Helmet>
                        <title>{ele.title} for {ele.platform} | Toxic Games</title>
                        <meta name="description" content={ele.description} />
                        <meta
                            name="keywords"
                            content={`${ele.title}, ${ele.title} for ${ele.platform}, Mac Games, Free Games, PC Games, Download Games, Android Games, Playstation iso`}
                        />
                        <meta name="robots" content="index, follow" /> {/* Hide from search results but crawlable */}
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Game",
                                "name": ele.title,
                                "platform": ele.platform,
                                "url": `https://toxicgames.in/download/${sanitizeTitle(ele.platform)}/${sanitizeTitle(ele.title)}/${ele._id}`,
                                "description": ele.description,
                                "image": ele.coverImg,
                                "downloadUrl": `https://toxicgames.in/download/${sanitizeTitle(ele.platform)}/${sanitizeTitle(ele.title)}/${ele._id}`,
                                "datePublished": ele.createdAt,
                                "size": ele.size,
                                "price": ele.isPaid ? `₹${ele.price}` : "Free",
                            })}
                        </script>

                    </Helmet>
                    <h1>{ele.title} for {ele.platform}</h1>
                    {/* Render the description with <br /> */}
                    <p
                        dangerouslySetInnerHTML={{
                            __html: ele.description.replace(/\\n/g, '<br />')
                        }}
                    />
                    <br /><br />

                    {/* Conditionally render download links only for crawlers */}
                    <noscript>
                        <a href={`https://toxicgames.in/download/${sanitizeTitle(ele.platform)}/${sanitizeTitle(ele.title)}/${ele._id}`} className="download-link">
                            Download {ele.title} for {ele.platform}
                        </a>
                    </noscript>

                    {/* If you want to display a specific Download Link URL for the download purpose: */}
                    <div className="download-links">
                        <a href={`https://toxicgames.in/download/${sanitizeTitle(ele.platform)}/${sanitizeTitle(ele.title)}/${ele._id}`} target="_blank" rel="noopener noreferrer">
                            Download {ele.title} for {ele.platform}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GamePage;
