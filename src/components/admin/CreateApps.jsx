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

        // Log FormData for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post(`${process.env.REACT_API}/apps/admin/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Handle success (e.g., reset form, show success message)
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error (e.g., show error message)
        }
    };




    return (
        <div className='container'>
            <div className="cover">
                <form onSubmit={handleSubmit}>
                    <div className='add'>
                        <h1>Add your Application</h1>
                    </div>
                    <div className='user'>
                        <label className='form-label'> Title </label>
                        <input type="text" placeholder='title name' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'> Description</label>
                        <input type="text" placeholder=' write description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'>Platform </label>
                        <input type="text" placeholder='platform' value={platform} onChange={(e) => setPlatform(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'>paid..? </label>
                        <input type="checkbox" placeholder='is it paid?' checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'> Price</label>
                        <input type="text" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'> Download Link</label>
                        <input type="text" placeholder='paste your download link' value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'> Size</label>
                        <input type="text" placeholder='enter the size' value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'>Category </label>
                        <input type="text" placeholder='enter required category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className='user'>
                        <label className='form-label'>Upload App Images.</label>
                        <input type="file" placeholder='please upload the imagesof the product' multiple onChange={handleThumbnail} />
                    </div>
                    <div className='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateApps