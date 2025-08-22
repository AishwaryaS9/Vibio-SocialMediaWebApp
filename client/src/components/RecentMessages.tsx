import { useEffect, useState } from "react"
import type { Message } from "../utils/helpers";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const RecentMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const { user } = useUser();
    const { getToken } = useAuth();

    const fetchRecentMessages = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get('/api/user/recent-messages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                const groupedMessages: Record<string, Message> = data.messages.reduce((acc: Record<string, Message>, message: Message) => {
                    const senderId =
                        typeof message.from_user_id === "string"
                            ? message.from_user_id
                            : message.from_user_id._id;

                    if (!acc[senderId] || new Date(message.createdAt) > new Date(acc[senderId].createdAt)) {
                        acc[senderId] = message;
                    }
                    return acc;
                }, {});

                //Sort messages by date
                const sortedMessages: Message[] = Object.values(groupedMessages).sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setMessages(sortedMessages);
            } else {
                toast.error(data.message || 'Failed to fetch messages');
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchRecentMessages();
            const intervalId = setInterval(fetchRecentMessages, 5000);
            return () => clearInterval(intervalId);
        }
    }, [user]);

    return (
        <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
            <h3 className="font-semibold text-slate-8 mb-4">Recent Messages</h3>
            <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
                {/* {messages.map((message, index) => (
                    <Link to={`/messages/${message.from_user_id._id}`} key={index} className="flex items-start gap-2 py-2 hover:bg-slate-100">
                        <img src={message.from_user_id.profile_picture} alt="profile picture"
                            className="w-8 h-8 rounded-full" />

                        <div className="w-full">
                            <div className="flex justify-between">
                                <p className="font-medium">{message.from_user_id.full_name}</p>
                                <p className="text-[10px] text-slate-400">{moment(message.createdAt).fromNow()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500">{message.text ? message.text : 'Media'}</p>
                                {!message.seen && <p className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">1</p>}
                            </div>
                        </div>
                    </Link>
                ))} */}
                {messages.map((message, index) => {
                    const sender =
                        typeof message.from_user_id === "string"
                            ? { _id: message.from_user_id, full_name: "Unknown", profile_picture: "" }
                            : message.from_user_id;

                    return (
                        <Link to={`/messages/${sender._id}`} key={index} className="flex items-start gap-2 py-2 hover:bg-slate-100">
                            <img src={sender.profile_picture} alt="profile picture"
                                className="w-8 h-8 rounded-full" />
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="font-medium">{sender.full_name}</p>
                                    <p className="text-[10px] text-slate-400">{moment(message.createdAt).fromNow()}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500">{message.text ? message.text : 'Media'}</p>
                                    {!message.seen && (
                                        <p className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">1</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default RecentMessages