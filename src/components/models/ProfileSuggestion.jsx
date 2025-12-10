import React from 'react'
import useOption from '../../hooks/useOption'

function ProfileSuggestion() {
  const { suggestionCategories } = useOption();

  console.log('🔴 Suggestion Categories inside model :', suggestionCategories);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile Suggestion</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">This is a placeholder for the ProfileSuggestion component.</p>
    </div>
  )
}

export default ProfileSuggestion
