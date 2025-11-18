import Section from "./ui/Section"
import ChatWindow from "./ui/ChatWindow"

function Chats() {
  return (
    <>
      <div className="flex flex-col gap-8"> 
        <Section title="Chatting with Matched Users" description="icon indicates chat threads with unread messages">
          <ChatWindow />
        </Section>
        <Section title="Chatting with disconnected/Blocked Users" description="icon indicates disconnected users this user can no longer chat with. New message text box is hidden">
          <p>This is another Section within Chats.</p>
        </Section>
      </div>
    </>
  )
}

export default Chats
