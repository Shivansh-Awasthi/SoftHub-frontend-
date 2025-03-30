import React from 'react'
import { useState, useEffect } from 'react';


const Donate = () => {

    const [donationGoal, setDonationGoal] = useState(1200); // $10,000 goal
    const [currentAmount, setCurrentAmount] = useState(300); // Starting at $2,500
    const [donationAmount, setDonationAmount] = useState(50);
    const [showThankYou, setShowThankYou] = useState(false);

    // Simulate loading current donation amount from backend
    useEffect(() => {
        // In a real app, you would fetch this from your backend
        // fetch('/api/donations/total').then(...)
    }, []);

    const handleDonate = () => {
        // In a real app, you would send this to your backend
        // fetch('/api/donations', { method: 'POST', body: ... })
        setCurrentAmount(prev => prev + donationAmount);
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 3000);
    };

    const progressPercentage = Math.min((currentAmount / donationGoal) * 100, 100);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Coming Soon Game Section */}
            <section className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-indigo-700">Support the project</h1>
                <div className=" p-8 rounded-lg border-2 border-dashed border-gray-300">
                    <img className='text-center mb-8' src="https://i.postimg.cc/8CKCtDWs/4y35ygtayile1.png" alt="" />
                    <div>
                        <h2 className='text-xl text-red-500'>For Public Release</h2>
                    </div>
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Raised: ₹{currentAmount.toLocaleString()}</span>
                            <span className="font-medium">Goal: ₹{donationGoal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                        We're working hard to bring you an amazing gaming experience.
                        Your support helps us make it even better!
                    </p>
                    <div className="animate-pulse text-indigo-500">You can request programs and games in the comments.</div>
                </div>
            </section>

            {/* Donation Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-center">Support Our Development</h2>



                {/* upi */}

                <div className="bg-[#262626] p-6 rounded-lg shadow-md ring-1 text-center mt-5">
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-4">UPI (Ask in Telegram)
                    </h3>
                    <p className="text-white mb-4 break-all">
                        PhonePe, Paytm etc..
                    </p>

                    <div className="">
                        {/* TRX-20 */}
                        <div className="border rounded-lg p-4">
                            {/* <h4 className="font-medium mb-2 text-center">BSC (BEP20)</h4> */}
                            <div className="flex justify-center mb-3">
                                <div className="bg-white  border rounded">
                                    {/* Placeholder for QR code - replace with your actual QR */}
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                                        <img src="https://i.postimg.cc/zD71FFgv/Screenshot-2025-03-26-at-1-33-37-AM.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-2 rounded text-xs break-all font-mono text-center">
                                Telegram:    Dm in this account.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crypto Donation Options */}
                {/* tron */}
                <div className="bg-[#262626] p-6 rounded-lg shadow-md ring-1 text-center mt-5">
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-4">USDT Tron (TRC20)</h3>
                    <p className="text-white mb-4 break-all">
                        TFq2xVb7ibR7q5Mb1pkWiiCT34BmS3y2gi
                    </p>

                    <div className="">
                        {/* TRX-20 */}
                        <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2 text-center">TRX (TRX-20)</h4>
                            <div className="flex justify-center mb-3">
                                <div className="bg-white  border rounded">
                                    {/* Placeholder for QR code - replace with your actual QR */}
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                                        <img src="https://i.postimg.cc/0yJ4QC5Q/Screenshot-2025-03-26-at-1-09-34-AM.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-2 rounded text-xs break-all font-mono text-center">
                                Address:    TFq2xVb7ibR7q5Mb1pkWiiCT34BmS3y2gi
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#262626] p-6 rounded-lg shadow-md ring-1 text-center mt-5">
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-4">USDT BSC
                        BNB Smart Chain (BEP20)
                    </h3>
                    <p className="text-white mb-4 break-all">
                        0x291dce3bd01fceec0665b9d6b9734946e335954b
                    </p>

                    <div className="">
                        {/* TRX-20 */}
                        <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2 text-center">BSC (BEP20)</h4>
                            <div className="flex justify-center mb-3">
                                <div className="bg-white  border rounded">
                                    {/* Placeholder for QR code - replace with your actual QR */}
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                                        <img src="https://i.postimg.cc/wMChbLCf/Screenshot-2025-03-26-at-1-20-22-AM.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-2 rounded text-xs break-all font-mono text-center">
                                Address:    0x291dce3bd01fceec0665b9d6b9734946e335954b
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#262626] p-6 rounded-lg shadow-md ring-1 text-center mt-5">
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-1">BTC (Bitcoin)
                    </h3>
                    <p className="text-white mb-6 break-all">
                        1DLfx6a4CU7G9Abj9fedxpdY21srPPstbX
                    </p>
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-1">ETH
                        Ethereum (ERC20)
                    </h3>
                    <p className="text-white mb-6 break-all">
                        0x291dce3bd01fceec0665b9d6b9734946e335954b
                    </p>
                    <h3 style={{ color: 'gray' }} className="text-xl font-semibold mb-1">PI (Pi Network)
                    </h3>
                    <p className="text-white mb-6 break-all">
                        MDFNWH6ZFJVHJDLBMNOUT35X4EEKQVJAO3ZDL4NL7VQJLC4PJOQFWAAAAAASEZWSRDSZI
                    </p>
                </div>
            </section>



            <div>
                <section className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-indigo-700">Coming Soon...</h1>
                    <div className=" p-8 rounded-lg border-2 border-dashed border-gray-300">
                        <img className='text-center mb-8' src="https://i.postimg.cc/WzF6znR8/God-of-war-ragnarok-banner-black-background-2-817x320.jpg" alt="" />
                        <div>
                            <h2 className='text-xl text-red-500 mb-3'>Upcoming Game</h2>
                        </div>

                        <div className="animate-pulse text-indigo-500">After the completion of Red Dead Redemption 2, then the other games will be posted.</div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Donate