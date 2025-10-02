import React, { useState, useEffect } from 'react';
import Select from './Select';
import {
    Heart,
    Users,
    Clock,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
    Sparkles
} from 'lucide-react';
import useAuthenticatedApi from '../../hooks/useAuthenticatedApi';
import ProfileCard from './ProfileCard';

function MatchesContainer({ title = 'Matches', data, endPoint = 'GetYourMatches' }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const api = useAuthenticatedApi();
    const [uiData, setUiData] = useState(data || null);
    const totalPages = uiData?.totalPages || 1;

    // Update uiData when data prop changes
    useEffect(() => {
        if (data) {
            setUiData(data);
            setCurrentPage(1); // Reset to page 1 when new data is provided
        }
    }, [data]);

    const fetchPage = async (page) => {
        if (!api) return;
        setLoading(true);
        try {
            const response = await api.get(`v1/query/${endPoint}?page=${page}`);
            setUiData(response.data);
            setCurrentPage(page); // Update current page after successful fetch
            ;
        } catch (error) {
            console.error('❌ Error fetching page:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log('🔴 Current UI Data:', {
        page: currentPage,
        totalPages: uiData?.totalPages,
        resultsCount: uiData?.results?.length,
        uiData: uiData
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Title with Icon */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                            <Heart className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
                            <p className="text-white/80 text-sm">Find your perfect connection</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            {uiData && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search matches..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>
            )}



            {/* Content Section */}
            <div className="p-6">
                {uiData ? (
                    <>
                        <div className="mb-4 text-gray-600 dark:text-gray-400">
                            Found {uiData?.results?.length || 0} matches
                        </div>
                        <div className="space-y-4">
                            {uiData?.results?.map((match) => (
                                <ProfileCard key={match.profileId} profile={match} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 dark:text-gray-400">
                            No data available
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    {/* Page Info */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="h-1 w-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                                style={{ width: `${(currentPage / totalPages) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                const prevPage = Math.max(1, currentPage - 1);
                                if (prevPage !== currentPage) {
                                    fetchPage(prevPage);
                                }
                            }}
                            disabled={currentPage === 1 || loading}
                            className="group flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                {loading ? 'Loading...' : 'Previous'}
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                const nextPage = Math.min(totalPages, currentPage + 1);
                                if (nextPage !== currentPage) {
                                    console.log('🔵 Clicking Next: current=', currentPage, 'target=', nextPage);
                                    fetchPage(nextPage);
                                }
                            }}
                            disabled={currentPage === totalPages || loading}
                            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <span className="text-sm font-medium">{loading ? 'Loading...' : 'Next'}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchesContainer

