import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateApps = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [platform, setPlatform] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(0);
    const [thumbnail, setThumbnail] = useState([]);
    const [downloadLink, setDownloadLinks] = useState(["no", "no", "no", "no", "no", "no"]);
    const [size, setSize] = useState("");
    const [unit, setUnit] = useState('MB');
    const [category, setCategory] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleThumbnail = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + thumbnail.length > 20) {
            alert("You can only upload up to 20 images/videos.");
            e.target.value = "";
            return;
        }
        setThumbnail((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDownloadLinkChange = (index, value) => {
        const newLinks = [...downloadLink];
        newLinks[index] = value;
        setDownloadLinks(newLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const filteredDownloadLink = downloadLink.filter(link => link.trim() !== "");

        if (filteredDownloadLink.length === 0) {
            toast.error("Please provide at least one download link!");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('platform', platform);
        formData.append('isPaid', isPaid);
        formData.append('price', price);
        formData.append('size', `${size} ${unit}`);
        formData.append('category', category);
        formData.append("coverImg", coverImg);

        // Append each download link individually
        filteredDownloadLink.forEach((link) => {
            formData.append('downloadLink[]', link);
        });

        thumbnail.forEach(file => {
            formData.append('thumbnail', file);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_API}/api/apps/admin/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            toast.success("App created successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
            toast.error("Error creating app! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: "pc", label: "PC Games" },
        { value: "spc", label: "PC Softwares" },
        { value: "mac", label: "Mac Games" },
        { value: "smac", label: "Mac Softwares" },
        { value: "android", label: "Android Games" },
        { value: "sandroid", label: "Android Softwares" },
        { value: "ppsspp", label: "PPSSPP Iso" },
        { value: "ps2", label: "PS2 Iso" },
        { value: "ps3", label: "PS3 Iso" },
        { value: "ps4", label: "PS4 Iso" },
    ];


    // Define custom labels and placeholders
    const downloadLinkLabelsAndPlaceholders = [
        { label: "Direct Link", placeholder: "Enter the Direct link" },
        { label: "OneDrive", placeholder: "Enter the oneDrive link" },
        { label: "Torrent", placeholder: "Enter the Torrent link" },
        { label: "Other Links", placeholder: "Enter other download link" },
        { label: "MediaFire Link", placeholder: "Enter Mrdiafire link" },
        { label: "Akira Box Link", placeholder: "Enter AkiraBox link" }
    ];

    return (
        <div className='container p-6'>
            <ToastContainer />
            <div className="cover">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
                    <h1 className='text-xl font-bold text-white mb-4'>Add your Application</h1>

                    {/* Form Fields */}
                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Title</label>
                        <input
                            type="text"
                            placeholder='title name'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Description</label>
                        <input
                            type="text"
                            placeholder='write description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Platform</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select Platform</option>
                            <option value="PC">PC</option>
                            <option value="Mac">Mac</option>
                            <option value="Android">Android</option>
                            <option value="Playstation">Playstation</option>
                        </select>
                    </div>
                    <div className='flex items-center mb-5'>
                        <input
                            id="isPaid"
                            type="checkbox"
                            checked={isPaid}
                            onChange={(e) => setIsPaid(e.target.checked)}
                            className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-300"
                        />
                        <label htmlFor="isPaid" className="ml-2 text-sm font-medium text-gray-300">Paid?</label>
                    </div>
                    {/* <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Price</label>
                        <input
                            type="text"
                            placeholder='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div> */}

                    {/* Download Links */}
                    {downloadLink.map((link, index) => (
                        <div className='mb-5' key={index}>
                            <label className='block mb-2 text-sm font-medium text-gray-300'>
                                {downloadLinkLabelsAndPlaceholders[index]?.label || `Download Link ${index + 1}`}
                            </label>
                            <input
                                type="text"
                                placeholder={downloadLinkLabelsAndPlaceholders[index]?.placeholder || `Paste your download link ${index + 1}`}
                                value={link}
                                onChange={(e) => handleDownloadLinkChange(index, e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    ))}

                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Size</label>
                        <div className="flex">
                            <input
                                type="number"
                                placeholder='enter the size'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            >
                                <option value="GB">GB</option>
                                <option value="MB">MB</option>
                            </select>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.value}>{category.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Thumbnail</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleThumbnail}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>

                    <div className='mb-5'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Cover Img</label>
                        <input
                            type="text"
                            placeholder='add cover image'
                            value={coverImg}
                            onChange={(e) => setCoverImg(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateApps;