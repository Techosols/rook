import Section from './ui/Section'
import Suggestions from './ui/Suggestions'
import useChat from '../../hooks/useChat';
import { SendIcon, Clock, CheckCircle2 } from 'lucide-react';

function ProfileSuggestionsByYou() {
  const {suggestionByYou} = useChat();

  return (
    <div>
      <Section title={'Profile Suggestions By You'} description={"You left a suggestion for another user but they haven't responded yet."}>
        {!suggestionByYou.length ? (
          <div className="py-12 px-6">
            {/* Empty State Container */}
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              
              {/* Animated Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <SendIcon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  No Suggestions Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                  You haven't suggested any profiles yet. Start suggesting profiles to users you think might be a great match!
                </p>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <SendIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Send Suggestions</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Suggest profiles</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Await Response</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Track replies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <p className="text-xs text-gray-500 dark:text-gray-500 pt-4">
                💡 Tip: Good suggestions often lead to meaningful connections
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestionByYou.map((item) => (
              <Suggestions 
                key={item.profileId}
                username={item.preferredName}
                description={item.notes}  
                timeStamp={item.suggestedAt}
                category={item.categoryName}
                result={item.result}
                readOnly={true}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

export default ProfileSuggestionsByYou
