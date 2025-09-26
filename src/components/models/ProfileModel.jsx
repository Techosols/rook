import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useAuth0 } from '@auth0/auth0-react';
import useModel from '../../hooks/useModel';

import { LogOutIcon, User } from 'lucide-react';

function ProfileModel() {
    const { setIsLoggedIn } = useAuth();
    const { logout, user, isLoading } = useAuth0();
    const { closeModel } = useModel();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    function handleLogout() {
        closeModel();
        setIsLoggedIn(false);
        localStorage.removeItem('RKU');
        localStorage.setItem("activeTab", 'background');
        logout({
            logoutParams: {
                returnTo: window.location.origin,
                client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
                federated: true
            }
        });
    }

    // List of user fields to show
    const userFields = [
        { label: 'Name', value: user?.name },
        { label: 'Email', value: user?.email },
        { label: 'Nickname', value: user?.nickname },
    ];

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                    <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600" onClick={handleLogout} title="Logout">
                        <LogOutIcon className="w-6 h-6 inline-block" />
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
            </div>
        );
    }

    // No user data state
    if (!user) {
        return (
            <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Guest User</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Profile data unavailable</p>
                    </div>
                    <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600" onClick={handleLogout} title="Logout">
                        <LogOutIcon className="w-6 h-6 inline-block" />
                    </button>
                </div>
                <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Unable to load profile information</p>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
                {user?.picture ? (
                    <div className="relative w-16 h-16">
                        {imageLoading && (
                            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                        {imageError ? (
                            <div className="w-16 h-16 rounded-full border-2 border-primary bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                            </div>
                        ) : (
                            <img 
                                src={user.picture} 
                                alt="User Avatar" 
                                className={`w-16 h-16 rounded-full border-2 border-primary object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageLoading(false);
                                    setImageError(true);
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                )}
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>
                </div>
                <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 " onClick={handleLogout} title="Logout">
                    <LogOutIcon className="w-6 h-6 inline-block" />
                </button>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {userFields.map(
                    (field) =>
                        field.value && (
                            <li key={field.label} className="flex justify-between items-center py-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">{field.label}</span>
                                <span className="text-gray-800 dark:text-gray-200 text-right break-all">{field.value}</span>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}

export default ProfileModel
