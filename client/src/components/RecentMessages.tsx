import { useEffect, useState } from "react"
import type { Message } from "../utils/helpers";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

type GroupedMessage = {
    lastMessage: Message;
    unreadCount: number;
};

const RecentMessages = () => {
    const [messages, setMessages] = useState<GroupedMessage[]>([]);
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
                const groupedMessages: Record<
                    string,
                    { lastMessage: Message; unreadCount: number }
                > = data.messages.reduce((acc: Record<string, GroupedMessage>, message: Message) => {
                    const senderId =
                        typeof message.from_user_id === "string"
                            ? message.from_user_id
                            : message.from_user_id._id;

                    if (!acc[senderId]) {
                        acc[senderId] = {
                            lastMessage: message,
                            unreadCount: message.seen ? 0 : 1,
                        };
                    } else {
                        // update last message
                        if (
                            new Date(message.createdAt) >
                            new Date(acc[senderId].lastMessage.createdAt)
                        ) {
                            acc[senderId].lastMessage = message;
                        }
                        // count unread
                        if (!message.seen) {
                            acc[senderId].unreadCount += 1;
                        }
                    }

                    return acc;
                }, {});

                //Sort messages by date
                const sortedMessages = Object.values(groupedMessages).sort(
                    (a, b) =>
                        new Date(b.lastMessage.createdAt).getTime() -
                        new Date(a.lastMessage.createdAt).getTime()
                );
                setMessages(sortedMessages);
            }
            else {
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
        <section className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800"
            aria-labelledby="recent-messages-title">
            <h3 id="recent-messages-title" className="font-semibold text-slate-8 mb-4">Recent Messages</h3>
            <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar" role="list"
                aria-label="List of recent messages">
                {messages.map(({ lastMessage, unreadCount }, index) => {
                    const sender =
                        typeof lastMessage.from_user_id === "string"
                            ? { _id: lastMessage.from_user_id, full_name: "Unknown", profile_picture: "" }
                            : lastMessage.from_user_id;

                    return (
                        <Link to={`/messages/${sender._id}`} key={index} className="flex items-start gap-2 py-2 hover:bg-slate-100"
                            aria-label={`Message from ${sender.full_name}. ${unreadCount > 0
                                ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""
                                }`
                                : "No unread messages"
                                }`}>
                            <img src={sender.profile_picture} alt={`Profile picture of ${sender.full_name}`} className="w-8 h-8 rounded-full" />
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="font-medium">{sender.full_name}</p>
                                    {/* <p className="text-[10px] text-slate-400">
                                        {moment(lastMessage.createdAt).fromNow()}
                                    </p> */}
                                    <time
                                        className="text-[10px] text-slate-400"
                                        dateTime={new Date(
                                            lastMessage.createdAt
                                        ).toISOString()}
                                    >
                                        {moment(
                                            lastMessage.createdAt
                                        ).fromNow()}
                                    </time>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500">
                                        {lastMessage.text ? lastMessage.text : "Media"}
                                    </p>
                                    {unreadCount > 0 && (
                                        <p aria-label={`${unreadCount} unread message${unreadCount > 1 ? "s" : ""
                                            }`}
                                            className="bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                                            {unreadCount}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default RecentMessages