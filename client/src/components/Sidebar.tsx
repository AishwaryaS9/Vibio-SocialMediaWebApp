import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import MenuItems from './MenuItems';
import type { FC } from 'react';
import { CirclePlus, LogOut } from 'lucide-react';
import { UserButton, useClerk } from '@clerk/clerk-react';
import { useAppSelector } from '../app/hooks';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();
    const user = useAppSelector((state) => state?.user?.value);
    const { signOut } = useClerk();

    return (
        <aside className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col
    justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'}
    transition-all duration-300 ease-in-out`}
            aria-label="Sidebar navigation">
            <div className='w-full'>
                <img onClick={() => navigate('/')} aria-label="Go to homepage"
                    src={assets.logo} alt="App logo" className='w-26 ml-7 my-2 cursor-pointer' />
                <hr className='border-gray-300 mb-8' />
                <MenuItems setSidebarOpen={setSidebarOpen} />
                <Link to='/create-post' className='flex items-center justify-center
                gap-2 py-2.5 mt-6 mx-6 rounded-lg customButton
                active:scale-95 transition text-white cursor-pointer' aria-label="Create a new post">
                    <CirclePlus className='w-5 h-5' aria-hidden="true" />
                    Create Post
                </Link>
            </div>
            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'
                aria-label="User profile and logout">
                <div className='flex gap-2 items-center cursor-pointer' aria-label={`Signed in as ${user?.full_name || 'User'}`}>
                    <UserButton />
                    <div>
                        <h1 className='text-sm font-medium'>{user?.full_name}</h1>
                        <p className='text-xs text-gray-500'>@{user?.username}</p>
                    </div>
                </div>
                <LogOut aria-label="Sign out" onClick={() => signOut()} aria-hidden="true"
                    className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />
            </div>
        </aside>
    )
}

export default Sidebar