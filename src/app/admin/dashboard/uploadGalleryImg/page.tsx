'use client'
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast} from 'react-hot-toast';

const GalleryPhotos = () => {

    const [imagePreview, setImagePreview] = useState<string>("");
    const [galleryImg, setGalleryImg] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setGalleryImg(selectedFile);
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
                const target = readerEvent.target as FileReader;
                if (selectedFile.type.includes("image") && target.result) {
                    setImagePreview(target.result.toString());
                }
            };
        }
    };

    const uploadFile = async (type: string) => {
        const data = new FormData();
        if (galleryImg) {
            data.append('file', galleryImg);
            data.append('upload_preset', 'image_preset');
        }
        try {
            const cloudName = process.env.NEXT_PUBLIC_CLODINARY_CLOUD_NAME;
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

            const res = await axios.post(api, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { secure_url, public_id } = res.data;
            console.log(secure_url, public_id);
            return { secure_url, public_id };

        } catch (error) {
            console.log('error when file uploaded... ', error);
            return null;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!galleryImg) {
            toast.error('Please select image.');
            setLoading(false);
            return;
        }
        let imageUploadData;
        if (galleryImg) {
            imageUploadData = await uploadFile('image');
            if (!imageUploadData) {
                toast.error('Error in image uploading');
                setLoading(false);
                return;
            }
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/galleryImages`, imageUploadData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Server Error');
        } finally {
            setLoading(false);
            setGalleryImg(null);
            setImagePreview("");
        }
    }

    return (
        <div className='max-w-7xl min-h-screen flex justify-center items-start m-auto pt-20'>
            <div className='flex justify-evenly items-center w-full gap-x-4 h-96 '>
                <div className='flex justify-start items-center flex-col w-1/2 h-full'>
                    <div className='flex justify-center items-start flex-col h-full'>
                        <h1 className='text-2xl font-semibold'>Upload Gallery Image</h1>
                        <p className='text-gray-400 my-5'> Upload images with proper dimensions wisely. </p>
                        <form onSubmit={handleSubmit}>
                            <label className=" block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" onChange={previewFile} name="galleryImg" className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                " />
                            </label>
                            <button
                                type="submit"
                                disabled={loading || !galleryImg}
                                className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-4 disabled:bg-gray-300 `}
                            >
                                {loading ? "Processing" : 'Upload'}
                            </button>
                        </form>
                    </div>
                </div>
                <div className='border-gray-400 border-dashed bg-slate-50 rounded-xl border-2 flex justify-center items-center w-1/2 h-full p-2'>
                    {galleryImg ?
                        <Image src={imagePreview} width={500} height={400} className="object-contain h-full" alt="projectImg" />
                        :
                        <div className='w-48 object-contain'>
                            <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                                <path fill="#B3DDF5" d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z" />
                                <circle fill="#020856e1" cx="35" cy="16" r="3" />
                                <polygon fill="#020856e1" points="20,16 9,32 31,32" />
                                <polygon fill="#8CBCD6" points="31,22 23,32 39,32" />
                                <circle fill="#a4e401" cx="38" cy="38" r="10" />
                                <g fill="#023656d2">
                                    <rect x="36" y="32" width="4" height="12" />
                                    <rect x="32" y="36" width="12" height="4" />
                                </g>
                            </svg>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GalleryPhotos;
