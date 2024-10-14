import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mac = () => {

    const [data, setData] = useState([])


    const handleData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/mac`)
            setData(response.data.apps)

        } catch (error) {
            console.log("Error fetching mac games " + error);

        }

    }

    useEffect(() => {
        handleData()
    }, [])
    console.log(data);





    return (
        <div className='container mx-auto p-4'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>Games <span className=' font-medium ml-2 text-[#8E8E8E]'>{data.length}</span></h1>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full">


                {data.map((ele) => {

                    {/* loop */ }
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-52 shadow-xl overflow-hidden">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden">
                            <img
                                src={ele.thumbnail[0]}
                                alt={ele.title}
                                className="rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                            />
                        </figure>
                        <div className="flex flex-col p-4">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff]">Size: {ele.size}</div>
                        </div>
                    </div>

                    {/* loop ends */ }

                })}






            </div>
        </div>
    );
}

export default Mac;
