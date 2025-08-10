import React from "react";
import Image from "next/image";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { LogoMini, WhiteIcon } from "../icons/SvgIcons";
import AuthModal from "../ui/AuthModal";
import { useLocation } from "../../contexts/LocationContext";

const DetailPageHeader = () => {
    const { selectedLocation, setSelectedLocation } = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState("");
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);

    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLDivElement>(null);
    const profileDropdownRef = React.useRef<HTMLDivElement>(null);

    // Mock suggestions data
    const mockSuggestions = [
        "Art exhibitions in Ibadan",
        "Music festivals",
        "Coffee shops in Bodija",
        "Weekend events",
    ];

    React.useEffect(() => {
        if (searchInput.trim() === "") {
            setShowSuggestions(false);
        } else {
            setShowSuggestions(true);
        }
    }, [searchInput]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="py-8 top-0 z-50 lg:relative lg:bg-transparent absolute w-full">
            <div className={`lg:bg-transparent ${isAuthModalOpen ? 'bg-transparent' : 'bg-black/40'} lg:backdrop-blur-none ${isAuthModalOpen ? 'backdrop-blur-none' : 'backdrop-blur-sm'} rounded-full lg:rounded-full mx-2 lg:mx-0 px-1 py-2 lg:py-0`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:pr-0">
                {/* Location and Search Bar grouped together */}
                <div className="flex items-center space-x-2 lg:space-x-4 flex-1">
                {/* Location Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div className="flex items-center space-x-1 lg:space-x-2 py-2 px-2 rounded">
                        <div onClick={() => window.location.href = "/"} className="cursor-pointer">
                            <LogoMini
                                width={32}
                                height={32}
                                className="lg:hidden"
                            />
                            <Image
                                src="/images/logo-secondary.png"
                                alt="Logo"
                                width={48}
                                height={48}
                                className="object-contain hidden lg:block"
                            />
                        </div>
                        <button
                            className="flex items-center space-x-1 lg:space-x-2"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-label="Select location"
                        >
                            <span className="text-base lg:text-2xl font-bold text-white lg:text-[#0063BF]">
                                {selectedLocation}
                            </span>
                            <FiChevronDown className="w-4 h-4 text-white lg:text-[#0063BF]" />
                        </button>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md  z-50">
                            {["Ibadan", "Lagos", "Abeokuta"].map((location) => (
                                <button
                                    key={location}
                                    className={`w-full font-medium text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0063BF] ${location === selectedLocation ? "bg-blue-50 text-[#0063BF]" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedLocation(location);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {location}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="flex-none w-32 ml-3 mr-1 lg:ml-0 lg:mr-0 lg:flex-none lg:w-[500px] max-w-none lg:max-w-lg relative" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for where to explore"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full py-2 lg:py-4 pl-4  bg-transparent lg:bg-gray-50 border border-white lg:border-gray-200 rounded-full text-xs text-white lg:text-gray-700 placeholder-white lg:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white lg:focus:ring-[#0063BF] hidden lg:block"
                            aria-label="Search"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full py-2 lg:py-4 pl-4  bg-transparent lg:bg-gray-50 border border-white lg:border-gray-200 rounded-full text-xs text-white lg:text-gray-700 placeholder-white lg:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white lg:focus:ring-[#0063BF] lg:hidden"
                            aria-label="Search"
                        />
                        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white lg:text-gray-400" />
                    </div>
                    {showSuggestions && searchInput && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md  z-50">
                            {mockSuggestions
                                .filter((suggestion) =>
                                    suggestion.toLowerCase().includes(searchInput.toLowerCase())
                                )
                                .map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => {
                                            setSearchInput(suggestion);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>
                </div>

                {/* User Icon */}
                <div className="relative lg:mr-[-4rem]" ref={profileDropdownRef}>
                    {!isAuthenticated ? (
                        <button
                            className="flex items-center space-x-2 py-3 px-3 lg:p-3 rounded-full bg-[#0063BF] hover:bg-[#0056a3] lg:hover:bg-[#0056a3] transition-colors"
                            onClick={() => setIsAuthModalOpen(true)}
                            aria-label="Sign up"
                        >
                            <span className="text-xs lg:text-sm font-medium text-white lg:text-white">Sign up</span>
                            <WhiteIcon 
                                width={16} 
                                height={16} 
                                className="text-white lg:text-white"
                            />
                        </button>
                    ) : (
                        <>
                            <button
                                className="flex items-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-full bg-[#0063BF] hover:bg-[#0056a3] transition-colors"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                aria-label="User menu"
                            >
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#0063BF] rounded-full flex items-center justify-center">
                                    <WhiteIcon 
                                        width={16} 
                                        height={16} 
                                        className="lg:w-5 lg:h-5 text-white"
                                    />
                                </div>
                                <FiChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md z-50">
                                    {["Profile", "Saved", "Logout"].map((option) => (
                                        <button
                                            key={option}
                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0063BF]"
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                                if (option === 'Logout') {
                                                    setIsAuthenticated(false);
                                                }
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Auth Modal */}
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onAuthenticated={() => setIsAuthenticated(true)}
                />
            </div>
        </div>
        </header>
    );
};

export default DetailPageHeader;