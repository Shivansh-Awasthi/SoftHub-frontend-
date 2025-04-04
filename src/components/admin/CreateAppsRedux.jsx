import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApp, clearAdminState } from '../../redux/slices/adminSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAppsRedux = () => {
    const dispatch = useDispatch();
    const { loading, error, success, message } = useSelector(state => state.admin);
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [version, setVersion] = useState('');
    const [size, setSize] = useState('');
    const [requirements, setRequirements] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewScreenshots, setPreviewScreenshots] = useState([]);
    
    // Clear admin state when component mounts
    useEffect(() => {
        dispatch(clearAdminState());
    }, [dispatch]);
    
    // Handle success and error messages
    useEffect(() => {
        if (success) {
            toast.success(message || 'App created successfully!');
            // Reset form
            resetForm();
            // Clear success state after 3 seconds
            setTimeout(() => {
                dispatch(clearAdminState());
            }, 3000);
        }
        
        if (error) {
            toast.error(error || 'Failed to create app');
        }
    }, [success, error, message, dispatch]);
    
    // Reset form
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setVersion('');
        setSize('');
        setRequirements('');
        setDownloadLink('');
        setIsPaid(false);
        setPrice('');
        setImage(null);
        setScreenshots([]);
        setPreviewImage('');
        setPreviewScreenshots([]);
    };
    
    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Handle screenshots change
    const handleScreenshotsChange = (e) => {
        const files = Array.from(e.target.files);
        setScreenshots(files);
        
        // Generate previews
        const previews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                if (previews.length === files.length) {
                    setPreviewScreenshots(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!title || !description || !category || !downloadLink || !image) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        // Create FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('version', version);
        formData.append('size', size);
        formData.append('requirements', requirements);
        formData.append('downloadLink', downloadLink);
        formData.append('isPaid', isPaid);
        if (isPaid && price) {
            formData.append('price', price);
        }
        formData.append('image', image);
        
        // Append screenshots
        screenshots.forEach(screenshot => {
            formData.append('screenshots', screenshot);
        });
        
        // Dispatch create app action
        dispatch(createApp(formData));
    };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-8">Create New App</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="App title"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="mac">Mac Games</option>
                                    <option value="smac">Mac Software</option>
                                    <option value="pc">PC Games</option>
                                    <option value="spc">PC Software</option>
                                    <option value="android">Android Games</option>
                                    <option value="sandroid">Android Apps</option>
                                    <option value="ps2">PS2 Games</option>
                                    <option value="ps3">PS3 Games</option>
                                    <option value="ps4">PS4 Games</option>
                                    <option value="ppsspp">PPSSPP Games</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="version">
                                    Version
                                </label>
                                <input
                                    type="text"
                                    id="version"
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="e.g., 1.0.0"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    id="size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="e.g., 2.5 GB"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="downloadLink">
                                    Download Link *
                                </label>
                                <input
                                    type="text"
                                    id="downloadLink"
                                    value={downloadLink}
                                    onChange={(e) => setDownloadLink(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="https://example.com/download"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isPaid}
                                        onChange={(e) => setIsPaid(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700 text-sm font-bold">Paid App</span>
                                </label>
                            </div>
                            
                            {isPaid && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., 9.99"
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Right column */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="4"
                                    placeholder="App description"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirements">
                                    System Requirements
                                </label>
                                <textarea
                                    id="requirements"
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="4"
                                    placeholder="System requirements"
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                    Main Image *
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={handleImageChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    accept="image/*"
                                    required
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="screenshots">
                                    Screenshots
                                </label>
                                <input
                                    type="file"
                                    id="screenshots"
                                    onChange={handleScreenshotsChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    accept="image/*"
                                    multiple
                                />
                                {previewScreenshots.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {previewScreenshots.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Screenshot ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                'Create App'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAppsRedux;
