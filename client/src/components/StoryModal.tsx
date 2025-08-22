import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react'
import type { StoryModalProps } from '../utils/helpers';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';

const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"];

const StoryModal: React.FC<StoryModalProps> = ({ setShowModal, fetchStories }) => {
    const [mode, setMode] = useState("text");
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState("");
    const [media, setMedia] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { getToken } = useAuth();

    const modalRef = useRef<HTMLDivElement>(null);

    const MAX_VIDEO_DURATION = 60; //seconds
    const MAX_VIDEO_SIZE_MB = 50; //MB

    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('video')) {
                if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                    toast.error(`Video file size cannot exceed ${MAX_VIDEO_SIZE_MB} MB.`);
                    setMedia(null);
                    setPreviewUrl(null);
                    return;
                }
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src);
                    if (video.duration > MAX_VIDEO_DURATION) {
                        toast.error("Video duration cannot exceed 1 minute.");
                        setMedia(null);
                        setPreviewUrl(null);
                    } else {
                        setMedia(file);
                        setPreviewUrl(URL.createObjectURL(file));
                        setText('');
                        setMode('media');
                    }
                }
                video.src = URL.createObjectURL(file);
            } else if (file.type.startsWith('image')) {
                setMedia(file);
                setPreviewUrl(URL.createObjectURL(file));
                setText('');
                setMode('media');
            }
        }
    }

    const handleCreateStory = async () => {
        const media_type = mode === 'media' ? media?.type.startsWith('image') ? 'image' : 'video' : 'text';

        if (media_type === "text" && !text) {
            throw new Error("Please enter some text");
        }
        let formData = new FormData();
        formData.append('content', text);
        formData.append('media_type', media_type);
        if (media) {
            formData.append('media', media);
        }
        formData.append('background_color', background);

        const token = await getToken();
        try {
            const { data } = await api.post('/api/story/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setShowModal(false);
                toast.success("Story created successfully");
                fetchStories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'
            role="dialog" aria-modal="true" aria-labelledby="story-modal-title" ref={modalRef}>
            <div className='w-full max-w-md'>
                <div className='text-center mb-4 flex items-center justify-between'>

                    <button onClick={() => setShowModal(false)} aria-label="Close story creation modal"
                        className='text-white p-2 cursor-pointer'>
                        <ArrowLeft aria-hidden="true" />
                    </button>
                    <h2 id="story-modal-title" className='text-lg font-semibold'>Create Story</h2>
                    <span className='w-10'></span>
                </div>

                <div className='rounded-lg h-96 flex items-center justify-center relative'
                    style={{ backgroundColor: background }}
                    aria-label="Story preview area">
                    {mode === "text" && (
                        <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none
                        focus:outline-none' placeholder="What's on your mind?" name="" id="" aria-label="Story text input"
                            onChange={(e) => setText(e.target.value)} value={text}
                        />
                    )}

                    {mode === "media" && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="Preview of uploaded image for story" className='object-contain max-h-full' />
                        ) : (
                            <video src={previewUrl} className='object-contain max-h-full' aria-label="Preview of uploaded video for story" />
                        )
                    )}

                </div>

                <div className='flex mt-4 gap-2' role="radiogroup" aria-label="Background color options">
                    {bgColors.map((color) => (
                        <button key={color} style={{ backgroundColor: color }}
                            onClick={() => setBackground(color)}
                            className='w-6 h-6 rounded-full ring cursor-pointer'
                            role="radio"
                            aria-checked={background === color}
                            aria-label={`Background color ${color}`} />
                    ))}

                </div>

                <div className='flex gap-2 mt-4'>
                    <button onClick={() => {
                        setMode('text');
                        setMedia(null);
                        setPreviewUrl(null);
                    }}
                        aria-pressed={mode === 'text'}
                        className={`flex-1 flex items-center justify-center gap-2
                        p-2 rounded cursor-pointer ${mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                        <TextIcon size={18} /> Text
                    </button>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer
                       ${mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'} `}
                        aria-label="Upload a photo or video">
                        <input type="file" accept='image/*, video/*'
                            className='hidden' onChange={handleMediaUpload} />
                        <Upload size={18} aria-hidden="true" /> Photo/Video
                    </label>
                </div>

                <button onClick={() => toast.promise(handleCreateStory(), {
                    loading: 'Saving...'
                })}
                    className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full
                rounded customButton active:scale-95 transition cursor-pointer'
                    aria-label="Create story">
                    <Sparkle size={18} aria-hidden="true" /> Create Story
                </button>
            </div>
        </div>
    )
}

export default StoryModal