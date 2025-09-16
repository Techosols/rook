import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useAuth0 } from '@auth0/auth0-react';
import useModel from '../../hooks/useModel';

import { LogOutIcon } from 'lucide-react';

function ProfileModel() {
    const { setIsLoggedIn } = useAuth();
    const { logout, user } = useAuth0();
    const { closeModel } = useModel();

    console.log('User: ', user)

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

    return (
        <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
                {user?.picture && (
                    <img src={user.picture} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-primary" />
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
