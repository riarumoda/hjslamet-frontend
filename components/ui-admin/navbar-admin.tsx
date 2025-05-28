"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { dummyUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface NavbarAdminProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

export default function NavbarAdmin({ drawerOpen, setDrawerOpen }: NavbarAdminProps) {
    const router = useRouter()

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fix theme toggle by ensuring component is mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("admin");
        
        router.push("/admin/auth")
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                        </button>
                        <Link href="/admin" className="flex ms-2 md:me-24">
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                H. Slamet
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                            ) : (
                            <Moon className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        )}
                        <div className="flex items-center ms-3">
                            {/* Drop-down user menu */}
                            <div className="relative" ref={dropdownRef}>

                                {/* Toggle Button */}
                                <button
                                    onClick={() => setIsOpen(prev => !prev)}
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                                    id="user-menu-button"
                                >
                                    <svg className="w-8 h-8 text-gray-800 bg-white rounded-full dark:text-white dark:bg-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                {isOpen && (
                                    <div
                                        className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="dropdown-user"
                                    >
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">{dummyUser.name}</p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{dummyUser.email}</p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <button onClick={handleSignOut} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    ) 
}
