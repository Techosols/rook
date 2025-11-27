import { ReplyIcon, TrashIcon } from "lucide-react";

export const Replies = ({ replies }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="ml-8 flex flex-col gap-2 mt-2 border-primary p-2">
      {replies.map((reply) => (
        <div key={reply.messageId} className="pl-4 text-gray-700">
        <div className="flex justify-between items-center border-b-2 py-3">
            <div className="flex flex-col">
          <p className="font-semibold text-primary">{reply.sender}</p>
          <p>{reply.messageContent}</p>
            </div>
          <div className="flex gap-4">
            <button className="text-primary hover:underline transition-all cursor-pointer"><ReplyIcon /></button>
            <button className="text-primary hover:underline transition-all cursor-pointer"><TrashIcon /></button>
          </div>
            </div>
          {/* Render nested replies recursively */}
          <Replies replies={reply.replies} />
        </div>
      ))}
    </div>
  );
};