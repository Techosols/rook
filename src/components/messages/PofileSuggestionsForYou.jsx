import Section from "./ui/Section";
import { SmileIcon, Users, Sparkles } from "lucide-react";
import Suggestions from "./ui/Suggestions";
import useChat from "../../hooks/useChat";

function ProfileSuggestionsForYou() {
  const { suggestionsForYou = [], loading } = useChat();

  return (
    <Section
      title="Profile Suggestions From Other Users"
      description="You can react to each suggestion using one of three buttons"
    >
      {loading && (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !suggestionsForYou.length && (
        <div className="py-12 px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                No Suggestions Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                When other users suggest your profile, they'll appear here. Keep
                improving your profile to get more suggestions!
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <SmileIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Express Interest
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      React to suggestions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      New Connections
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Meet new people
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 pt-4">
              💡 Tip: Complete your profile to increase suggestions from others
            </p>
          </div>
        </div>
      )}

      {!loading && suggestionsForYou.length > 0 && (
        <div className="space-y-4">
          {suggestionsForYou.map((item) => (
            <Suggestions
              key={item.suggestionId}
              username={item.preferredName}
              description={item.notes}
              timeStamp={item.suggestedAt}
              category={item.categoryName}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

export default ProfileSuggestionsForYou;
