import { MessageSquare, Search, Edit3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useState } from 'react'

const Messages = () => {
  const navigate = useNavigate()
  const { connections } = useAppSelector((state) => state.connections)

  const [searchQuery, setSearchQuery] = useState("")

  const filteredConnections = connections.filter((user) =>
    user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex bg-white" role="application">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col"
        aria-label="Conversations sidebar">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button className="p-2 rounded-full" aria-label="Start new conversation">
            <Edit3 className="w-5 h-5 text-slate-700" aria-hidden="true" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100">
            <Search className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <input id="message-search"
              aria-label="Search conversations"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Connections list */}
        <div className="flex-1 overflow-y-auto" aria-label="Conversation list">
          {filteredConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center text-slate-500">
              <p>No conversations found</p>
            </div>
          ) : (
            filteredConnections.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/messages/${user?._id}`)}
                aria-label={`Open conversation with ${user?.full_name}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition"
              >
                <img
                  src={user?.profile_picture}
                  alt={`${user?.full_name}'s profile picture`}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{user?.full_name}</p>
                  <p className="text-sm text-slate-500 truncate">@{user?.username}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center"
        role="main" aria-label="Message preview panel">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 border-2 border-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-500" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Your messages</h3>
          <p className="text-slate-500 mb-4">Send a message to start a chat.</p>
        </div>
      </div>
    </div>
  )
}

export default Messages
