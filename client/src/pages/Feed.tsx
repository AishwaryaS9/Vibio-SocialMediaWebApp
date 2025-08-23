import { useState, useEffect } from 'react'
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import type { Post } from '../utils/helpers';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Feed = () => {
  const [feeds, setFeeds] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/post/feed', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setFeeds(data.posts)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeeds();
  }, []);


  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5
    flex items-start justify-center xl:gap-8' role="main"
      aria-label="User feed">

      {/* Stories and Posts List */}
      <div aria-label="Stories and posts">
        <StoriesBar />
        <div className='p-4 space-y-6' aria-live="polite">
          {feeds.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
              <h2 className="text-lg font-semibold text-slate-700">
                No Posts Yet
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Follow or connect with other users to start seeing posts in your feed.
              </p>
              <button aria-label="Refresh feed"
                onClick={fetchFeeds}
                className="mt-4 px-4 py-2 cursor-pointer text-white text-sm rounded-lg shadow customButton transition"
              >
                Refresh Feed
              </button>
            </div>
          )}
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className='max-xl:hidden sticky top-0' aria-label="Sponsored content and recent messages">
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} alt="Sponsored ad about email marketing" className='w-75 h-50 rounded-md' />
          <p className='text-slate-600'>Email marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-
            to-use platform built for results.</p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Feed