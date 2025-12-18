
import Notification from './ui/Notification'
import Section from './ui/Section'
import useChat from '../../hooks/useChat';
import { Mail, Trash2 } from 'lucide-react';

function MessageFromRook() {
  const { rookMessages } = useChat();
  
  return (
    <>
      <Section title="Messages from Rook" description="You can delete a message to remove it from the list.">
        {!rookMessages || rookMessages.length === 0 ? (
          <div className="py-12 px-6">
            {/* Empty State Container */}
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              
              {/* Animated Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Inbox Clear
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                  You don't have any messages from Rook at the moment. Messages will appear here when we have updates or announcements for you.
                </p>
              </div>

              {/* Info Cards */}
              <div className="w-full max-w-sm space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Important Messages</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Updates about your account and features</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-3">
                    <Trash2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Manage Messages</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Delete messages you don't need</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
                💡 Messages from Rook are important - don't miss them!
              </p>
            </div>
          </div>
        ) : (
          <Notification items={rookMessages}/>
        )}
      </Section>
    </>
  )
}

export default MessageFromRook

