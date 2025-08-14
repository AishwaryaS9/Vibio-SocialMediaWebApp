import { Home, MessageCircle, Search, UserIcon, Users } from "lucide-react";
import sample_profile from './sample_profile_pic.svg'
import sample_cover from './sample_cover.svg'
import userimg_1 from './userimg_1.svg'
import userimg_2 from './userimg_2.svg'

export const assets = {
    sample_profile,
    sample_cover,
    userimg_1,
    userimg_2
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];

export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "John Warren",
    "username": "john_warren",
    "bio": "Dreamer | Learner | Doer\r\nExploring life one step at at time.\r\n Staying curious. Creating with purpose.",
    "profile_picture": sample_profile,
    "cover_photo": sample_cover,
    "location": "New York, NY",
    "followers": ["user_2", "user_3"],
    "following": ["user_2", "user_3"],
    "connections": ["user_2", "user_3"],
    "posts": [],
    "is_verified": true,
    "createdAt": "2025-07-09T09:26:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "Richard Hendricks",
    full_name: "Richard Hendricks",
    profile_picture: userimg_1
}


const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "alexa_james",
    full_name: "Alexa james",
    profile_picture: userimg_2
}

export const dummyStoriesData = [
    {
        "_id": "688334466e4b42b6850688860",
        "user": dummyUserData,
        "content": "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄. The next post will make more sense 🐢.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:16:06.958Z",
        "updatedAt": "2025-07-25T08:16:06.958Z"
    },
    {
        "_id": "688334466e4b42b6850688861",
        "user": dummyUserData,
        "content": "🌅 Sunrise vibes today! Feeling optimistic and ready to tackle new challenges. Let’s go! 🚀",
        "media_url": "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
        "media_type": "text",
        "background_color": "#f97316",
        "createdAt": "2025-07-26T06:00:00.000Z",
        "updatedAt": "2025-07-26T06:00:00.000Z"
    },
    {
        "_id": "688334466e4b42b6850688862",
        "user": dummyUserData,
        "content": "📚 Just finished reading an amazing book. Highly recommend it if you love plot twists! 😲",
        "media_url": "https://images.pexels.com/photos/31238037/pexels-photo-31238037.jpeg",
        "media_type": "text",
        "background_color": "#22c55e",
        "createdAt": "2025-07-27T12:30:00.000Z",
        "updatedAt": "2025-07-27T12:30:00.000Z"
    },
    {
        "_id": "688334466e4b42b6850688863",
        "user": dummyUserData,
        "content": "🎶 New playlist dropped! Perfect for late-night coding sessions 💻✨",
        "media_url": "https://images.pexels.com/photos/7804618/pexels-photo-7804618.jpeg",
        "media_type": "text",
        "background_color": "#0ea5e9",
        "createdAt": "2025-07-28T22:15:00.000Z",
        "updatedAt": "2025-07-28T22:15:00.000Z"
    }
];
