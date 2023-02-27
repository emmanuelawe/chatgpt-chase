'use client'
import { db } from "@/firebase"
import { ArrowCircleDownIcon } from "@heroicons/react/outline"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"

type Props = {
    chatId: string
}

const Chat = ({chatId}: Props) => {
  const {data: session} = useSession()

  const [messages] = useCollection(session && query(
    collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
    ))

  return (
    <div className="flex-1 max-h-[80%] scrollbar-hide overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
        <p className="mt-10 text-center text-white">
          Type a prompt in below to get started!
        </p>
        <ArrowCircleDownIcon className="h-10 w-10 mx-auto mt-5 text-white
        animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => ( 
      <Message key={message.id} message={message.data()} /> 
      ))}
    </div>
  )
}

export default Chat