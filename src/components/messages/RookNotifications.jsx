import Notification from './ui/Notification';
import Section from './ui/Section';
import useChat from '../../hooks/useChat';
import { Bell, BellOff } from 'lucide-react';

function RookNotifications() {
  const { rookNotifications = [], loading } = useChat();

  return (
    <Section title="Notifications" description="Latest updates from Rook">
      {/* ===================== LOADING STATE ===================== */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900"
            >
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* ===================== EMPTY STATE ===================== */}
      {!loading && (!rookNotifications || rookNotifications.length === 0) && (
        <div className="py-12 px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <BellOff className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                All Caught Up!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                You have no new notifications at the moment. We'll let you know when something important happens.
              </p>
            </div>

            {/* Info Cards */}
            <div className="w-full max-w-sm space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Smart Notifications
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      We only notify you about what matters most
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Stay Updated
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      New matches, messages, and suggestions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
              💡 Check back soon for new updates and messages
            </p>
          </div>
        </div>
      )}

      {/* ===================== DATA STATE ===================== */}
      {!loading && rookNotifications.length > 0 && (
        <Notification items={rookNotifications} />
      )}
    </Section>
  );
}

export default RookNotifications;
