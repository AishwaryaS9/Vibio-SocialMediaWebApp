import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react';
import type { FullUser } from '../utils/helpers';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { fetchUser } from '../features/user/userSlice';

interface UserCardProps {
    user: FullUser;
}

const UserCard = ({ user }: UserCardProps) => {
    const currentUser = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { getToken } = useAuth();


    const handleFollow = async () => {
        try {
            const { data } = await api.post('/api/user/follow', { id: user._id }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            if (data.success) {
                toast.success(data.message);
                dispatch(fetchUser(await getToken()));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const handleConnectionRequest = async () => {
        if (currentUser?.connections.includes(user._id)) {
            return navigate('/messages/' + user._id)
        }

        try {
            const { data } = await api.post('/api/user/connect', { id: user._id }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }
    const isFollowing = currentUser?.following.includes(user._id);
    const isConnected = currentUser?.connections.includes(user._id);

    return (
        <div key={user._id} className='p-4 pt-6 flex flex-col justify-between w-72 shadow
        border border-gray-200 rounded-md'  role="region"
            aria-labelledby={`user-${user._id}-name`}>
            <div className="text-center">
                <img src={user.profile_picture} alt={`${user.full_name}'s profile picture`}
                    className='rounded-full w-16 shadow-md mx-auto' />
                <p id={`user-${user._id}-name`} className='mt-4 font-semibold'>{user.full_name}</p>
                {user.username && <p className='text-gray-500 font-light' aria-label={`Username ${user.username}`}>@{user.username}</p>}
                {user.bio && <p className='text-gray-600 mt-2 text-center text-sm px-4' aria-label="User biography">{user.bio}</p>}
            </div>

            <div className='flex items-center justify-center gap-2 mt-4 text-xs text-gray-600'>
                <div className='flex items-center border border-gray-300 rounded-full px-3 py-1'
                    aria-label={`Location: ${user.location}`}>
                    <MapPin className='w-4 h-4' aria-hidden="true" /> {user.location}
                </div>

                <div className='flex items-center border border-gray-300 rounded-full px-3 py-1'
                    aria-label={`${user.followers.length} followers`}>
                    <span>{user.followers.length}&nbsp;</span>Followers
                </div>
            </div>

            <div className='flex mt-4 gap-2'>
                {/* Follow Button */}
                <button onClick={handleFollow} disabled={currentUser?.following.includes(user._id)} className='w-full py-2 rounded-md flex justify-center items-center gap-2 customButton
                active:scale-95 transition text-white cursor-pointer'aria-pressed={isFollowing}
                    aria-label={isFollowing ? `Unfollow ${user.full_name}` : `Follow ${user.full_name}`}
                >
                    <UserPlus className='w-4 h-4' aria-hidden="true" /> {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
                </button>

                {/* Connection Request Button / Message Button */}
                <button onClick={handleConnectionRequest} aria-label={isConnected ? `Message ${user.full_name}` : `Connect with ${user.full_name}`}
                    className='flex items-center justify-center w-16 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition'>
                    {currentUser?.connections.includes(user._id) ?
                        <MessageCircle className='w-5 h-5 group-hover:scale-105 transition' aria-hidden="true" />
                        : <Plus className='w-5 h-5 group-hover:scale-105 transition' aria-hidden="true" />
                    }
                </button>
            </div>
        </div>
    )
}

export default UserCard