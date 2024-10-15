import axios from 'axios'
import React, { useState } from 'react'

const CreateApps = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [platform, setPlatform] = useState("")
    const [isPaid, setIsPaid] = useState(false)
    const [price, setPrice] = useState(0)
    const [thumbnail, setThumbnail] = useState([])
    const [downloadLink, setDownloadLink] = useState("")
    const [size, setSize] = useState("")
    const [category, setCategory] = useState("")

    const handleThumbnail = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + thumbnail.length > 20) {
            alert("You can only upload up to 20 images/videos.");
            e.target.value = "";
            return;
        }
        setThumbnail((prevFiles) => [...prevFiles, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('platform', platform);
        formData.append('isPaid', isPaid);
        formData.append('price', price);
        formData.append('downloadLink', downloadLink);
        formData.append('size', size);
        formData.append('category', category);
        thumbnail.forEach(file => {
            formData.append('thumbnail', file);
        });

        try {
            const response = await axios.post(`${process.env.REACT_API}/api/apps/admin/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='container p-6 '>
            <div className="cover ">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md ">
                    <h1 className='text-xl font-bold text-white mb-4 bg-gray-800'>Add your Application</h1>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Title</label>
                        <input type="text" placeholder='title name' value={title} onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Description</label>
                        <input type="text" placeholder='write description' value={description} onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="">Select Platform</option>
                            <option value="PC">PC</option>
                            <option value="Mac">Mac</option>
                            <option value="Android">Android</option>
                            <option value="Playstation">Playstation</option>
                        </select>
                    </div>
                    <div className='flex items-center mb-5 bg-gray-800'>
                        <input id="isPaid" type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)}
                            className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-300 " />
                        <label htmlFor="isPaid" className="ml-2 text-sm font-medium text-gray-300 bg-gray-800">Paid?</label>
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Price</label>
                        <input type="text" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Download Link</label>
                        <input type="text" placeholder='paste your download link' value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Size</label>
                        <input type="text" placeholder='enter the size' value={size} onChange={(e) => setSize(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Category</label>
                        <input type="text" placeholder='enter required category' value={category} onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='mb-5 bg-gray-800'>
                        <label className='block mb-2 text-sm font-medium text-gray-300 bg-gray-800'>Upload App Images</label>
                        <input type="file" multiple onChange={handleThumbnail}
                            className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700" />
                        <div className="mt-1 text-sm text-gray-500 bg-gray-800">You can upload up to 20 images.</div>
                    </div>
                    <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateApps;
