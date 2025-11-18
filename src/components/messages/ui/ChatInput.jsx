
import { Send } from "lucide-react"
import Button from "../../ui/Button"
import Input from "../../ui/Input";

import { useState } from "react"

function ChatInput() {


    const [message, setMessage] = useState("");

    return (
        <div className="flex items-center">
            <Input type="text" placeholder="Type a message..." className="flex-1 p-2 border rounded-md" value={message} onChange={(e) => setMessage(e.target.value)} />
            
            <Button className="ml-2 px-4 py-2" size="sm"><Send size={20} disabled={message.trim() == ""} /></Button>
        </div>
    )
}

export default ChatInput
