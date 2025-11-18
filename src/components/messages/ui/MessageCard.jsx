import { formateTime } from "../../../utils/functions"

function MessageCard({ message }) {
  const isYourMessage = message?.you === true;

  return (
    <div className={`flex ${isYourMessage ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs px-3 py-2 rounded-lg ${isYourMessage ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-900 rounded-bl-none'}`}>
        <p className="text-sm break-words">{message?.messageContent}</p>
        <span className={`text-xs mt-1 block text-right opacity-70 ${isYourMessage ? 'text-gray-100' : 'text-gray-600'}`}>
          {formateTime(message?.sentAt)}
        </span>
      </div>
    </div>
  )
}

export default MessageCard
