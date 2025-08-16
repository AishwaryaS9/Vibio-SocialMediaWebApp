//interface

export interface User {
    _id: string;
    username: string;
    avatar_url?: string;
    profile_picture: string;
    full_name: string;
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

export interface FullUser extends User {
    email: string;
    bio: string;
    cover_photo: string;
    location: string;
    followers: string[];
    following: string[];
    connections: string[];
    posts: any[];
    is_verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    _id: string;
    from_user_id: FullUser;
    to_user_id: FullUser;
    text: string;
    message_type: string;
    media_url: string;
    seen: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfileInfoProps {
    user: FullUser;
    posts: Post[];
    profileId?: string;
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
