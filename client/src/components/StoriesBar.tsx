import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react';
import moment from 'moment';
import type { Story } from '../utils/helpers';
import StoryModal from './StoryModal';
import StoryViewer from './StoryViewer';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const StoriesBar = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [viewStory, setViewStory] = useState<Story | null>(null);

    const { getToken } = useAuth();


    const fetchStories = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get('/api/story/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setStories(data.stories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        fetchStories();
    }, []);

    return (
        <section aria-label="User stories" className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
            <div className='flex gap-4 pb-5' role='list'>
                {/* Add Story Card */}
                <div onClick={() => setShowModal(true)} aria-label="Create a new story"
                    className='rounded-lg shadow-sm min-w-30 max-w-30 max-h-40
                aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200
                border-2 border-dashed border-primary bg-gradient-to-b from-lightOrange to-white'
                >
                    <div className='h-full flex flex-col items-center justify-center p-4'>
                        <div className='size-10 bg-primary rounded-full flex items-center justify-center mb-3'>
                            <Plus className='w-5 h-5 text-white' aria-hidden="true" />
                        </div>
                        <p className='text-sm font-medium text-slate-700'>
                            Create Story
                        </p>
                    </div>
                </div>

                {/* Story Cards */}
                {stories.map((story, index) => (
                    <div onClick={() => setViewStory(story)} key={index} className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200
                         bg-gradient-to-b from-lightOrange
                    to-primary/80 hover:from-primary/90 hover:to-lightOrange active:scale-95`}
                        aria-label={`View story by ${story.user.full_name}. Posted ${moment(
                            story.createdAt
                        ).fromNow()}`}>
                        <img src={story.user.profile_picture} alt={`Profile picture of ${story.user.full_name}`}
                            className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow'
                        />
                        <p className='absolute top-18 left-3 text-white/60 text-sm
                        truncate max-w-24'>{story.content}</p>
                        <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>{moment(story.createdAt).fromNow()}</p>

                        {story.media_type !== 'text' && (
                            <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                                {story.media_type === "image" ?
                                    <img src={story.media_url} alt={`Story media by ${story.user.full_name}`} className='h-full w-full object-cover
                      hover:scale-110 transition duration-500 opacity-70 hover:opacity-80' />
                                    : <video src={story.media_url} className='h-full w-full object-cover
                      hover:scale-110 transition duration-500 opacity-70 hover:opacity-80'  aria-label={`Video story by ${story.user.full_name}`} />
                                }
                            </div>
                        )}


                    </div>
                ))}

            </div>

            {/* Add Story Modal */}
            {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}

            {/* View Story Modal */}
            {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
        </section >
    )
}

export default StoriesBar