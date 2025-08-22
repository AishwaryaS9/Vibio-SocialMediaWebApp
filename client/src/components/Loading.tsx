import React from "react";

interface LoadingProps {
    height?: string;
}

const Loading: React.FC<LoadingProps> = ({ height = '100vh' }) => {
    return (
        <div style={{ height }} className='flex items-center justify-center h-screen'
            role="status" aria-busy="true" aria-live="polite">
            <div className='w-10 h-10 rounded-full border-3 border-primary border-t-transparent animate-spin' aria-hidden="true">
            </div>
        </div>
    )
}

export default Loading