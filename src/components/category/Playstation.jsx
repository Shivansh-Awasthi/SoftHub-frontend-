import React from 'react'

const Playstation = () => {
    return (
        <div>
            <div className='container mx-auto p-4'>
                <div className='cover mb-6'>
                    <h1 className='font-bold text-3xl mb-4'>Games <span>1000</span></h1>
                </div>

                <div className="flex flex-wrap justify-start gap-8 max-w-full">

                    {/* loop */}
                    <div className="flex flex-col rounded-2xl w-64 h-52 shadow-xl overflow-hidden">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden">
                            <img
                                src="https://img.goodfon.com/wallpaper/nbig/4/a6/assassin-s-creed-unity-arno-1436.webp"
                                alt="Assassin's Creed Unity Game Cover"
                                className="rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                            />
                        </figure>
                        <div className="flex flex-col p-4">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">Generator overflow-hidden overflow-hidden</div>
                            <div className="text-xs font-thin text-[#ffffff]">Size: 20GB</div>
                        </div>
                    </div>

                    {/* loop ends */}




                </div>
            </div>
        </div>
    )
}

export default Playstation