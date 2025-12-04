import Section from "./ui/Section"
import ChatWindow from "./ui/ChatWindow"

function Chats() {
  return (
    <>
      <div className="flex flex-col gap-8"> 
        <Section title="Chatting with Matched Users" description="icon indicates chat threads with unread messages">
          <ChatWindow />
        </Section>
      </div>
    </>
  )
}

export default Chats
