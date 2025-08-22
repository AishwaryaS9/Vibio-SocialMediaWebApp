import { BadgeCheck, X } from 'lucide-react'
import type { Story } from '../utils/helpers';
import { useEffect, useState } from 'react';

type StoryViewerProps = {
    viewStory: Story;
    setViewStory: React.Dispatch<React.SetStateAction<Story | null>>;
};

const StoryViewer: React.FC<StoryViewerProps> = ({ viewStory, setViewStory }) => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: number;
        let progressInterval: number;
        if (viewStory && viewStory.media_type !== 'video') {
            setProgress(0);
            const duration = 10000;
            const setTime = 100;
            let elapsed = 0;

            progressInterval = setInterval(() => {
                elapsed += setTime;
                setProgress((elapsed / duration) * 100);
            }, setTime);

            //Close story after duration (10sec)
            timer = setTimeout(() => {
                setViewStory(null);
            }, duration);
        }
        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);

        }
    }, [viewStory, setViewStory]);

    const handleClose = () => {
        setViewStory(null);
    }

    if (!viewStory) return null;

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return (
                    <img src={viewStory.media_url} alt={viewStory.content || "User story image"}
                        className='max-w-full max-h-screen object-contain' />
                );
            case 'video':
                return (
                    <video src={viewStory.media_url} aria-label="User story video"
                        onEnded={() => setViewStory(null)}
                        className='max-h-screen' controls autoPlay />
                );
            case 'text':
                return (
                    <div role="document"
                        aria-label="User story text content"
                        className='w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>
                        {viewStory.content}
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center'
            style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : "#000000" }}
            role="dialog" aria-modal="true" aria-labelledby="story-title">

            {/* Progress Bar */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Story progress indicator">
                <div className='h-full bg-white transition-all duration-100 linear' style={{ width: `${progress}%` }}>
                </div>
            </div>

            {/* User Info - Top Left */}
            <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50'>
                <img src={viewStory.user?.profile_picture} alt={`${viewStory.user?.full_name || "User"}'s profile picture`}
                    className='size-7 sm:size-8 rounded-full object-cover border border-white' />
                <div className='text-white font-medium flex items-center gap-1.5'>
                    <span>{viewStory.user?.full_name}</span>
                    <BadgeCheck size={18} aria-hidden="true" />
                </div>
            </div>

            {/* Close Button */}
            <button onClick={handleClose} aria-label="Close story viewer"
                className='absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none'>
                <X className='w-8 h-8 hover:scale-110 transition cursor-pointer' aria-hidden="true" />
            </button>

            {/* Content Wrapper */}
            <div className='max-w-[90vw] max-h-[90vh] flex items-center justify-center'>
                {renderContent()}
            </div>
        </div>
    )
}

export default StoryViewer