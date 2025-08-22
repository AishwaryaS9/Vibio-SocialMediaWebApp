import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import Loading from '../components/Loading';
import { useAppSelector } from '../app/hooks';
import Header from '../components/header';

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useAppSelector((state) => state?.user?.value);

  return user ? (
    <div className='w-full flex h-screen'>
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 bg-slate-50 overflow-y-auto pt-14 sm:pt-0">
        <Outlet />
      </div>
      {sidebarOpen ? <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md
        shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(false)} />
        : <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md
        shadow w-10 h-10 text-gray-600 sm:hidden'onClick={() => setSidebarOpen(true)} />}
    </div>
  ) : (
    <Loading />
  )
}

export default Layout