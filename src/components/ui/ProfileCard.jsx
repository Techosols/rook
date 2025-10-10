import React, { useState } from 'react'
import { BookmarkPlus, BookmarkMinus, BellOff, UserRoundX, MapPin, Image, UserPlus2, UserMinus2, LucideHourglass, BadgeCheck } from 'lucide-react'
// Material icons (prefer for badges)
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
// import useAuthenticatedApi from '../../hooks/useAuthenticatedApi';

function ProfileCard({ profile }) {
  console.log('🔵 Rendering ProfileCard for profile:', profile);
  // State for toggleable icons - initialize with profile data
  const [iconStates, setIconStates] = useState({
    link: false,
    bookmark: profile?.bookmarkedByYou || false,
    bell: profile?.ignoredByYou || false,
    block: profile?.blockedByYou || false
  });

  // const api = useAuthenticatedApi();

  const toggleIcon = (iconName) => {
    setIconStates(prev => ({
      ...prev,
      [iconName]: !prev[iconName]
    }));
  };

  // If no profile data, show loading state
  if (!profile) {
    return (
      <div className='group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-pulse'>
        <div className='relative p-6'>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className='aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl'>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className='relative p-6'>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h4 className="text-3xl font-bold text-gray-800 dark:text-white">{profile.preferredName}</h4>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                {profile.ageInYears}
              </span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">{profile.city}</span>
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleIcon('link')}
              className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer ${
                iconStates.link 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={iconStates.link ? 'Remove Connection' : 'Connect'}
            >
              {iconStates.link ? <UserMinus2 size={18} /> : <UserPlus2 size={18} /> }
            </button>
            
            <button 
              onClick={() => toggleIcon('bookmark')}
              className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer ${
                iconStates.bookmark 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={iconStates.bookmark ? 'Remove Bookmark' : 'Bookmark'}
            >
              {iconStates.bookmark ? <BookmarkMinus size={18} /> : <BookmarkPlus size={18} />}
            </button>
            
            <button 
              onClick={() => toggleIcon('bell')}
              className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer ${
                iconStates.bell 
                  ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/25' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Ignore"
            >
              <BellOff size={18} />
            </button>
            
            <button 
              onClick={() => toggleIcon('block')}
              className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer ${
                iconStates.block 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Block User"
            >
              <UserRoundX size={18} />
            </button>
          </div>
        </div>


        {/* Image Section */}
        <div className="mb-4">
          {profile.collageUrl ? (
            <>
              <img src={profile.collageUrl} alt="" className='w-full h-50 rounded-xl' />
            </>
          ) : (
            <Image />
          )}
        </div>

        {/* Footer Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
          <div className="flex items-center space-x-3">
            {/* Background check status badge - map status to icon and color */}
            {(() => {
              const status = profile?.backgroundCheckStatus || '';
              const key = status.toString().toLowerCase();

              const statusMap = {
                'background check not started': {
                  icon: <HourglassEmptyIcon fontSize="small" className="text-gray-600 dark:text-gray-300" />,
                  bg: 'bg-gray-50 dark:bg-gray-900/20',
                  text: 'text-gray-700 dark:text-gray-300'
                },
                'background check pending': {
                  icon: <PendingIcon fontSize="small" className="text-amber-600 dark:text-amber-400" />,
                  bg: 'bg-amber-50 dark:bg-amber-900/20',
                  text: 'text-amber-700 dark:text-amber-300'
                },
                'background check started': {
                  icon: <LucideHourglass fontSize="small" className="text-blue-600 dark:text-blue-400" />,
                  bg: 'bg-blue-50 dark:bg-blue-900/20',
                  text: 'text-blue-700 dark:text-blue-300'
                },
                'background check in progress': {
                  icon: <AutorenewIcon fontSize="small" className="text-purple-600 dark:text-purple-400" />,
                  bg: 'bg-purple-50 dark:bg-purple-900/20',
                  text: 'text-purple-700 dark:text-purple-300'
                },
                'background check failed': {
                  icon: <CancelIcon fontSize="small" className="text-red-600 dark:text-red-400" />,
                  bg: 'bg-red-50 dark:bg-red-900/20',
                  text: 'text-red-700 dark:text-red-300'
                },
                'background check completed': {
                  icon: <BadgeCheck fontSize="small" className="text-green-600 dark:text-green-400" />,
                  bg: 'bg-green-50 dark:bg-green-900/20',
                  text: 'text-green-700 dark:text-green-300'
                }
              };

              const item = statusMap[key] || null;
              if (!item) return null;

              return (
                <div className={`flex items-center space-x-1 px-3 py-1.5 ${item.bg} rounded-lg`} title={status}>
                  {item.icon}
                  {/* <span className={`${item.text} text-xs font-medium`}>{status}</span> */}
                </div>
              );
            })()}
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                {profile.distanceInMiles} mile{profile.distanceInMiles !== 1 ? 's' : ''} away
              </span>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              {profile.height} / {profile.weight}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="space-y-2 flex gap-1">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {profile.educationLevel}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span className="font-medium"> || </span> {profile.occupation}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span className="font-medium"> || </span> {profile.kidsDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
