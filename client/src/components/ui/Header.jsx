import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = auth;

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    const scrolled = window.scrollY > 50;
    setHasShadow(shouldHaveShadow);
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // hide searchbar based on url
    if (location.pathname === '/') {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    // clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <header
      className={`fixed top-0 z-50 flex w-screen justify-center transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 py-3' 
          : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-4'
      }`}
    >
      <div
        className={`flex ${
          showSearchBar ? 'justify-around' : 'justify-between px-10'
        } w-screen max-w-screen-xl items-center`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isScrolled ? 'shadow-lg' : 'shadow-2xl'}`}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse ${isScrolled ? 'opacity-50' : 'opacity-100'}`}></div>
          </div>

          <div className="flex flex-col">
            <span className={`text-2xl font-bold transition-all duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'} group-hover:text-blue-400`}>
              StayInn
            </span>
            <span className={`text-xs transition-all duration-300 ${isScrolled ? 'text-gray-500' : 'text-blue-200'} group-hover:text-blue-300`}>
              by Chirag Yadav
            </span>
          </div>
        </Link>

        {showSearchBar && <SearchBar />}

        <div className="flex items-center gap-4">
          {/* Admin Dashboard Link */}
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              Admin
            </Link>
          )}

          <Link
            to={user ? '/account' : '/login'}
            className={`flex items-center gap-3 rounded-full transition-all duration-300 hover:scale-105 ${
              isScrolled 
                ? 'bg-gray-100 hover:bg-gray-200 px-4 py-2' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`hidden h-5 w-5 md:block transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <div className="relative">
              <div className={`h-8 w-8 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                isScrolled ? 'border-gray-300' : 'border-white/50'
              }`}>
                {user ? (
                  <Avatar>
                    {user?.picture ? (
                      <AvatarImage src={user.picture} className="h-full w-full object-cover" />
                    ) : (
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </Avatar>
                ) : (
                  <div className={`h-full w-full flex items-center justify-center ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`}>
                    <svg
                      fill={isScrolled ? "#6B7280" : "#FFFFFF"}
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="796 796 200 200"
                      enableBackground="new 796 796 200 200"
                      xmlSpace="preserve"
                      stroke={isScrolled ? "#6B7280" : "#FFFFFF"}
                      className="h-5 w-5"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path>{' '}
                      </g>
                    </svg>
                  </div>
                )}
              </div>
              {user && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
