import React from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { LogoMini, WhiteIcon, SearchIcon, BlueUserIcon } from "../icons/SvgIcons";
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
    const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);

    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
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
                // Only collapse search expansion on mobile when clicking truly outside
                if (typeof window !== 'undefined' && window.innerWidth < 768 && isSearchExpanded) {
                    setIsSearchExpanded(false);
                }
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchExpanded]);

    // Auto-focus input when search is expanded
    React.useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    return (
        <header className="py-8 top-0 z-50 lg:relative lg:bg-transparent absolute w-full">
            <div className={`lg:bg-transparent ${isAuthModalOpen ? 'bg-transparent' : 'bg-black/40'} lg:backdrop-blur-none ${isAuthModalOpen ? 'backdrop-blur-none' : 'backdrop-blur-sm'} rounded-full lg:rounded-full mx-2 lg:mx-0 ${isSearchExpanded ? 'px-0' : 'pl-1 pr-4'} py-2 lg:py-0`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:pr-0">
                    {/* Location and Search Bar grouped together */}
                    <div className="flex items-center space-x-6 lg:space-x-4 flex-1">
                        {/* Location Dropdown */}
                        <div
                            className={`relative transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
                                }`}
                            ref={dropdownRef}
                        >
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
                        <div
                            className={`transition-all duration-300 ease-in-out ${isSearchExpanded
                                ? 'absolute left-0 right-5 z-10  flex items-center justify-start h-full'
                                : 'w-24 ml-1 mr-3 lg:ml-0 lg:mr-0 lg:flex-none lg:w-[500px] max-w-none lg:max-w-lg relative'
                                }`}
                            ref={searchRef}
                        >
                            <div className={`relative ${isSearchExpanded ? 'w-full' : 'w-full md:w-[480px]'}`}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={typeof window !== 'undefined' && window.innerWidth > 768 ? "Search for where to explore" : "Search"}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onFocus={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                            setIsSearchExpanded(true);
                                        }
                                        setShowSuggestions(true);
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                setIsSearchExpanded(false);
                                            }
                                        }, 100);
                                    }}
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                            setIsSearchExpanded(true);
                                        }
                                    }}
                                    className={`w-full ${isSearchExpanded ? 'py-3' : 'py-1.5 lg:py-4'
                                        } pl-4 bg-transparent lg:bg-gray-50 border border-white lg:border-gray-200 rounded-full text-xs text-white lg:text-gray-700 placeholder-white lg:placeholder-gray-400 placeholder:text-xs lg:placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-white lg:focus:ring-[#0063BF]`}
                                    style={{
                                        maxWidth: '100%',
                                        fontSize: '16px'
                                    }}
                                    aria-label="Search"
                                />
                                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white lg:hidden" />
                            </div>
                            {showSuggestions && searchInput && (
                                <div className={`absolute z-50 bg-white rounded-md shadow-lg  ${isSearchExpanded
                                    ? 'left-4 right-4 top-full mt-2'
                                    : 'left-0 right-0 top-full mt-1'
                                    }`}>
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
                                                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                        setIsSearchExpanded(false);
                                                    }
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
                    <div
                        className={`relative lg:mr-[-4rem] flex-shrink-0 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
                            }`}
                        ref={profileDropdownRef}
                    >
                        {!isAuthenticated ? (
                            <button
                                className="flex items-center space-x-1 py-2 px-2 lg:px-4 lg:py-3 rounded-full bg-white  transition-colors ml-2"
                                onClick={() => setIsAuthModalOpen(true)}
                                aria-label="Sign up"
                            >
                                <span className="text-xs lg:text-sm font-medium text-[#0063BF] lg:text-[#0063BF] whitespace-nowrap">Sign up</span>
                                <BlueUserIcon
                                    width={12}
                                    height={12}
                                    className="text-white lg:text-white flex-shrink-0 lg:w-[14px] lg:h-[14px]"
                                />
                            </button>
                        ) : (
                            <>
                                <button
                                    className="flex items-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-full bg-[#0063BF] hover:bg-[#0056a3] transition-colors ml-4"
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