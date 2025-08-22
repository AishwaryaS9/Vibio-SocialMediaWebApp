import React from "react";
import { Menu } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const navigate = useNavigate();

    return (
        <div role="banner"
            className="sm:hidden w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between fixed top-0 left-0 z-30">
            {/* Logo */}
            <img
                src={assets.logo}
                alt="logo"
                aria-label="Go to homepage"
                onClick={() => navigate("/")}
                className="h-8 cursor-pointer"
            />

            {/* Sidebar toggle button */}
            <Menu
                className="w-6 h-6 text-gray-700 cursor-pointer"
                aria-label="Open sidebar menu"
                onClick={() => setSidebarOpen(true)}
            />
        </div>
    );
};

export default Header;
