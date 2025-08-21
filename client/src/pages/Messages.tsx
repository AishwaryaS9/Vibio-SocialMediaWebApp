import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';

const Messages = () => {

  const navigate = useNavigate();

  const { connections } = useAppSelector((state) => state.connections);

  return (
    <div className='min-h-screen relative bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Title */}
        <div className="mb-8">
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Messages</h1>
          <p className='text-slate-600'>Talk to your friends and family</p>
        </div>

        {/* Connected Users */}
        <div className="flex flex-col gap-3">
          {connections.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center bg-white shadow rounded-md">

              <h2 className="text-lg font-semibold text-slate-700">
                No conversations yet
              </h2>
              <p className="text-slate-500 mt-2 max-w-md">
                Connect with people to start chatting. Once you build your network,
                your conversations will appear here.
              </p>
              <button
                onClick={() => navigate('/connections')}
                className="mt-4 px-4 py-2 customButton cursor-pointer text-white text-sm rounded-lg shadow transition"
              >
                Find Connections
              </button>
            </div>
          ) : (
            connections.map((user) => (
              <div
                key={user._id}
                className="max-w-xl flex flex-wrap gap-5 p-6 bg-white shadow rounded-md"
              >
                <img
                  src={user?.profile_picture}
                  alt="profile_picture"
                  className="rounded-full size-12 mx-auto"
                />

                <div className="flex-1">
                  <p className="font-medium text-slate-700">{user?.full_name}</p>
                  <p className="text-slate-500">@{user?.username}</p>
                  <p className="text-sm text-gray-600">{user?.bio}</p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/messages/${user?._id}`)}
                    className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer gap-1"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Messages