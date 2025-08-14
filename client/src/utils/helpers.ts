//interface

export interface User {
    _id: string;
    username: string;
    avatar_url?: string;
}

export type PostType = 'text' | 'text_with_image' | 'image';

export interface Post {
    _id: string;
    user: User;
    content: string;
    image_urls: string[];
    post_type: PostType;
    likes_count: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Story {
    _id: string;
    user: {
        profile_picture: string;
        [key: string]: any;
    };
    content: string;
    media_url: string;
    media_type: "text" | "image" | "video";
    background_color: string;
    createdAt: string;
    updatedAt: string;
}

export interface StoryModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    fetchStories: () => Promise<void> | void;
}