import toast, { type Toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

type User = {
    _id: string;
    full_name: string;
    profile_picture: string;
};

type Message = {
    from_user_id: User;
    text: string;
};

type NotificationProps = {
    t: Toast;
    message: Message;
};

const Notification = ({ t, message }: NotificationProps) => {
    const navigate = useNavigate();

    return (
        <div className={`max-w-md w-full bg-white shadow-lg rounded-lg flex border border-gray-300 hover:scale-105 transition`}>
            <div className="flex-1 p-4">
                <div className="flex items-start">
                    <img src={message.from_user_id.profile_picture} alt="profile picture"
                        className="h-10 w-10 rounded-full flex-shrink-0 mt-0.5" />
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {message.from_user_id.full_name}&nbsp;
                            <span className="text-sm text-gray-500">
                                {message.text.slice(0, 50)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button onClick={() => {
                    navigate(`/messages/${message.from_user_id._id}`);
                    toast.dismiss(t.id)
                }} className="p-4 text-primary font-semibold">
                    Reply
                </button>
            </div>
        </div>
    )
}

export default Notification