import React, { useState } from 'react';

interface HeaderProps {
  onCardSearch: (searchKey: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCardSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="bg-[#2c2c3d] p-4 shadow-md">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold flex items-center">
            <span className="text-[#00ca72] mr-1">⬤</span>
            <span className="inline-block animate-wiggle mr-1">taskwave</span>
            <span className="text-[#676879] text-base font-normal">dev</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <button
            aria-label="Notifications"
            className="p-1 rounded-full hover:bg-[#3b3b4d]"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>

          {isSearchVisible && (
            <div className="relative">
              <input
                autoFocus
                className="bg-[#3b3b4d] text-white px-3 py-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00ca72] w-40"
                onChange={(event) => onCardSearch(event.target.value)}
                placeholder="Search..."
                type="text"
              />
            </div>
          )}

          <button
            aria-label={isSearchVisible ? 'Close search' : 'Search'}
            className="p-1 rounded-full hover:bg-[#3b3b4d]"
            onClick={toggleSearch}
          >
            {isSearchVisible ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
