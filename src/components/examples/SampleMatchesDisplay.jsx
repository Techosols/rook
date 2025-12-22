import React from 'react';
import ProfileCard from '../ui/ProfileCard';
import MatchesContainer from '../ui/MatchesContainer';

// Sample data structure as provided by the user
const sampleMatchesData = {
  
  "results": [
    {
      "preferredName": "Neoma",
      "profileId": "TT88FWLWKjP6NGW",
      "externalId": "CTthK9BqjDWWJ7T",
      "viewCount": 0,
      "lastLoginAt": null,
      "lastUpdated": null,
      "bookmarkedByYou": false,
      "ignoredByYou": false,
      "blockedByYou": false,
      "acceptingConnections": true,
      "connectionStatus": "",
      "ageInYears": 48,
      "distanceInMiles": 1,
      "isObsolete": false,
      "kidsDescription": "Does not have kids/Does not want kids",
      "height": "4' 6''",
      "weight": "132.00 lbs",
      "city": "Chicago",
      "occupation": "Community Health Workers",
      "backgroundCheckStatus": "Background Check Completed",
      "relationshipStatus": "Unknown",
      "collageUrl": "https://dev.rook.love/Images/Collage.jpg",
      "educationLevel": "Masters degree or higher"
    },
    {
      "preferredName": "Miracle",
      "profileId": "nc6fwDpWQKpJPzc",
      "externalId": "pcKthtgM8TjrrLC",
      "viewCount": 0,
      "lastLoginAt": null,
      "lastUpdated": null,
      "bookmarkedByYou": true,
      "ignoredByYou": false,
      "blockedByYou": false,
      "acceptingConnections": true,
      "connectionStatus": "",
      "ageInYears": 48,
      "distanceInMiles": 1,
      "isObsolete": false,
      "kidsDescription": "Does not have kids/Does not want kids",
      "height": "5' 3''",
      "weight": "168.00 lbs",
      "city": "Chicago",
      "occupation": "Mechanical Door Repairers",
      "backgroundCheckStatus": "Background Check Completed",
      "relationshipStatus": "Unknown",
      "collageUrl": "https://dev.rook.love/Images/Collage.jpg",
      "educationLevel": "High school/Trade school or higher"
    }
  ],
  "totalCount": 79,
  "page": 1,
  "pageSize": 20,
  "totalPages": 4
};

function SampleMatchesDisplay() {
  return (
    <MatchesContainer>
      <div className="space-y-6">
        {/* Results Summary */}
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {sampleMatchesData.results.length} of {sampleMatchesData.totalCount} matches
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Page {sampleMatchesData.page} of {sampleMatchesData.totalPages}
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sampleMatchesData.results.map((profile) => (
            <ProfileCard 
              key={profile.profileId} 
              profile={profile} 
            />
          ))}
        </div>

        {/* Pagination Info */}
        {sampleMatchesData.totalPages > 1 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Page {sampleMatchesData.page} of {sampleMatchesData.totalPages} • {sampleMatchesData.totalCount} total matches
          </div>
        )}
      </div>
    </MatchesContainer>
  );
}

export default SampleMatchesDisplay;