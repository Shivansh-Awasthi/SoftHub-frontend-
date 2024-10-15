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






    return (
        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>Games <span className=' font-medium ml-2 text-[#8E8E8E]'>{data.length}</span></h1>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full">


                {data.map((ele) => {

                    {/* loop */ }
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32 ">
                            <img
                                src={ele.thumbnail[1]}
                                alt={ele.title}
                                className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110 "
                            />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>

                    {/* loop ends */ }

                })}






            </div>
        </div>
    );
}

export default Mac;
