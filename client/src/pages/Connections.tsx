import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MessageSquare, UserCheck, UserPlus, UserRoundPen, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useAuth } from "@clerk/clerk-react";
import { fetchConnections } from "../features/connections/connectionSlice";
import api from "../api/axios";
import toast from "react-hot-toast";

const Connections = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();

  const [currentTab, setCurrentTab] = useState('Followers');

  const { connections, pendingConnections, followers, following } = useAppSelector((state) => state.connections);


  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
    { label: 'Connections', value: connections, icon: UserPlus },
  ];

  const handleUnfollow = async (userId: string) => {
    try {
      const { data } = await api.post('/api/user/unfollow', {
        id: userId
      }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const acceptConnection = async (userId: string) => {
    try {
      const { data } = await api.post('/api/user/accept', {
        id: userId
      }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchConnections(token));
    })
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" role="main" aria-label="Connections page">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8" role="banner">
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>Manage your network and discover new connections</p>
        </div>

        {/* Counts */}
        <div className="mb-8 flex flex-wrap gap-6" aria-label="Connections summary"
          role="region">
          {dataArray.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-1 border h-20 w-40
            border-gray-200 bg-white shadow rounded-md"
              role="status" aria-label={`${item.label}: ${item.value.length}`}>
              <b>{item.value.length}</b>
              <p className="text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm"
          role="tablist" aria-label="Connection categories">
          {dataArray.map((tab) => (
            <button onClick={() => setCurrentTab(tab.label)} key={tab.label} role="tab"
              aria-selected={currentTab === tab.label}
              aria-controls={`panel-${tab.label}`}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors cursor-pointer
            ${currentTab === tab.label ? 'bg-white font-medium text-black' : 'text-gray-500 hover:text-black'}`}>
              <tab.icon className="w-4 h-4" aria-hidden="true" />
              <span className="ml-1" aria-label={`${tab.value.length} ${tab.label}`}>{tab.label}</span>
              {tab.value.length > 0 && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{tab.value.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Connections */}
        <div className="flex flex-wrap gap-6 mt-6 w-full" id={`panel-${currentTab}`}
          role="tabpanel" aria-labelledby={currentTab}>
          {dataArray.find((item) => item.label === currentTab)?.value.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-16 text-center text-slate-500 bg-white shadow rounded-md" role="status">
              <p className="text-lg font-medium">
                {currentTab === "Followers" && "You don't have any followers yet."}
                {currentTab === "Following" && "You're not following anyone yet."}
                {currentTab === "Pending" && "No pending connection requests."}
                {currentTab === "Connections" && "No active connections yet."}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                {currentTab === "Followers" && "When people follow you, they'll appear here."}
                {currentTab === "Following" && "Start following users to see them here."}
                {currentTab === "Pending" && "Connection requests you receive will show up here."}
                {currentTab === "Connections" && "Accept requests or follow people to connect with them."}
              </p>
            </div>
          ) : (
            dataArray.find((item) => item.label === currentTab)?.value.map((user) => (
              <div key={user._id} aria-label={`User ${user.full_name}`}
                className="w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md">
                <img src={user.profile_picture} alt={`${user.full_name}'s profile picture`}
                  className="rounded-full w-12 h-12 shadow-md mx-auto" />
                <div className="flex-1">
                  <p className="font-medium text-slate-700">{user.full_name}</p>
                  <p className="font-normal text-md text-slate-700">@{user.username}</p>
                  <p className="font-normal text-slate-700 text-sm">
                    {user.bio.length > 30 ? user.bio.slice(0, 30) + "..." : user.bio}
                  </p>

                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    <button aria-label={`View profile of ${user.full_name}`}
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="w-full p-2 text-sm rounded-2xl customButton active:scale-95 transition text-white cursor-pointer"
                    >
                      View Profile
                    </button>

                    {currentTab === 'Following' && (
                      <button onClick={() => handleUnfollow(user._id)}
                        className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200
                text-black active:scale-95 transition cursor-pointer"
                        aria-label={`Unfollow ${user.full_name}`}>
                        Unfollow
                      </button>
                    )}

                    {currentTab === 'Pending' && (
                      <button onClick={() => acceptConnection(user._id)}
                        aria-label={`Accept connection request from ${user.full_name}`}
                        className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200
                text-black active:scale-95 transition cursor-pointer">
                        Accept
                      </button>
                    )}

                    {currentTab === 'Connections' && (
                      <button onClick={() => navigate(`/messages/${user._id}`)}
                        aria-label={`Send message to ${user.full_name}`}
                        className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200
                text-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1">
                        <MessageSquare className="w-4 h-4" aria-hidden="true" />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Connections