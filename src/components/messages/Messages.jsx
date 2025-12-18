import Section from "./ui/Section";
import SingleMessageThread from "./ui/SingleMessageThread";
import { MessageCircle, Send, Inbox } from "lucide-react";

import useChat from "../../hooks/useChat";
import { getDateAndMonth } from "../../utils/functions";

function Message() {

  const {
    messageThreads,
    messageReplies = [],
    loading,
    handleToggle,
    openMessageId,
  } = useChat();


  return (
    <div className="space-y-6">
      {/* Inbox Section */}
      <Section title="Messages" description="Inbox Showing messages Threads">
        <div className="bg-white dark:bg-gray-800  overflow-hidden">
          {/* Messages List */}
          <div className="h-[400px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {messageThreads && messageThreads.length > 0 ? (
              messageThreads.map((message) => (
                <div
                  key={message.messageId}
                  onClick={() => handleToggle(message.messageId)}
                  className={`grid grid-cols-12 gap-2 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-200 cursor-pointer border-l-4 ${
                    openMessageId === message.messageId
                      ? "bg-primary/8 dark:bg-primary/15 border-l-primary"
                      : "border-l-transparent hover:border-l-primary/40"
                  }`}
                >
                  <div className="col-span-2">
                    <p
                      className={`font-semibold truncate text-sm ${
                        openMessageId === message.messageId
                          ? "text-primary"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {message.receiver}
                    </p>
                  </div>
                  <div className="col-span-7">
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-1 text-sm">
                      {message.messageContent}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-gray-500 dark:text-gray-500 text-sm text-right font-medium">
                      {getDateAndMonth(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                {/* Empty State Container */}
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  {/* Animated Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <Inbox className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Your Inbox is Empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                      You don't have any message threads yet. Start a
                      conversation with someone to see messages here!
                    </p>
                  </div>

                  {/* Info Cards */}
                  <div className="w-full max-w-sm space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <Send className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Send Messages
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Start conversations with matches
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Stay Connected
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Chat with your connections
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Text */}
                  <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
                    💬 Your conversations will appear here once you start
                    chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Single Message Thread Section */}
      {openMessageId && (
        <Section
          title="A Single Message Thread"
          description="You can see replies of the selected message"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading replies...
                </p>
              </div>
            ) : (
              <SingleMessageThread message={messageReplies} />
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

export default Message;
