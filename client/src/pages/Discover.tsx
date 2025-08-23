import { useEffect, useState } from "react"
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { fetchUser } from "../features/user/userSlice";
import type { FullUser } from "../utils/helpers";

const Discover = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState<FullUser[]>([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const dispatch = useAppDispatch();

  const fetchUsers = async (searchValue: string) => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/user/discover', { input: searchValue }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      data.success ? setUsers(data.users) : toast.error(data.message);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Auto-search when user types 3+ characters
  useEffect(() => {
    if (input.trim().length >= 3) {
      const delayDebounce = setTimeout(() => {
        fetchUsers(input);
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setUsers([]);
    }
  }, [input]);

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token));
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-white"
      role="main"
      aria-label="Discover new people page">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8" role="banner">
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover People</h1>
          <p className='text-slate-600'>Connect with amazing people and grow your network</p>
        </div>

        {/* Search */}
        <div className="mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80"
          aria-label="Search users">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"
                aria-hidden="true" />
              <input id="discoverSearch"
                type="text" aria-label="Search input"
                placeholder="Search people by name, username, bio, or location..."
                className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm 
                focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-wrap gap-6" aria-label="Search results" aria-live="polite">
          {!loading && users.length === 0 && input === "" && (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center text-slate-500 bg-white shadow rounded-md">
              <h2 className="text-lg font-semibold text-slate-700">
                Start discovering people
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-md">
                Search by name, username, bio, or location to find and connect with new people.
              </p>
            </div>
          )}
          {!loading && users.length === 0 && input.length >= 3 && (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center text-slate-500 bg-white shadow rounded-md">
              <h2 className="text-lg font-semibold text-slate-700">
                No results found
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-md">
                We couldn't find anyone matching your search. Try a different keyword.
              </p>
            </div>
          )}

          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {loading && (
          <Loading height="60vh" />
        )}
      </div>
    </div>
  )
}

export default Discover;
