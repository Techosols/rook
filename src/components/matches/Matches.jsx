import React from 'react'
import ProfileCard from '../ui/ProfileCard'
import MatchesContainer from '../ui/MatchesContainer'
import useMatches from '../../hooks/useMatches';

function Match({ matchesData }) {
  // If no data provided, show loading state
  const { loadingMatches } = useMatches();

  // Show loading state only when actually loading AND no data available
  if (loadingMatches && (!matchesData || !matchesData.results)) {
    return (
      <MatchesContainer>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading matches...</p>
        </div>
      </MatchesContainer>
    );
  }

  // If no results found (and not loading)
  if (!loadingMatches && (!matchesData || !matchesData.results || matchesData.results.length === 0)) {
    return (
      <MatchesContainer>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No matches found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later for new matches.
          </p>
        </div>
      </MatchesContainer>
    );
  }

  return (  
    <MatchesContainer title="Your Matches" data={matchesData} >
      <div className="space-y-6">
        {/* Results Summary */}
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {matchesData?.results?.length} of {matchesData?.totalCount} matches
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Page {((matchesData?.page || 1))} of {matchesData?.totalPages}
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="flex flex-col gap-6">
          {matchesData?.results?.map((profile) => (
            <ProfileCard 
              key={profile.profileId} 
              profile={profile} 
            />
          ))}
        </div>

        {/* Pagination Info */}
        {matchesData?.totalPages > 1 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Page {((matchesData?.page || 1))} of {matchesData?.totalPages} • {matchesData?.totalCount} total matches
          </div>
        )}
      </div>
    </MatchesContainer>
  )
}

export default Match
