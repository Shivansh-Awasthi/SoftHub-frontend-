import axios from 'axios'
import React, { useEffect, useState } from 'react';

const Ppsspp = () => {


    const [data, setData] = useState([])


    const handleData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/ppsspp`)
            setData(response.data.apps)

        } catch (error) {
            console.log("Error fetching android softwares " + error);

        }

    }

    useEffect(() => {
        handleData()
    }, [])



    return (
        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>PPSSPP ISO <span className='font-medium ml-2 text-[#8E8E8E]'>{data.length}</span></h1>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full">


                {/* loop */}

                {data.map((ele) => {
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-36 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                            <img
                                src={ele.thumbnail[0]}
                                alt={ele.title}
                                className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                            />
                        </div>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2"> {ele.title} </div>
                            <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>
                })}

                {/* loop ends */}
            </div>
        </div>
    )
}

export default Ppsspp