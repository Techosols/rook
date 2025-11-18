import { MessageCircleWarning } from "lucide-react"

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full text-gray-500">
      <MessageCircleWarning className="w-12 h-12" />
        <p className="ml-4 text-lg">No chat selected. Please select a chat to start messaging.</p>
    </div>
  )
}

export default NoChatSelected
