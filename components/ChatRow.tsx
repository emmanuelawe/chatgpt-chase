import { db } from "@/firebase"
import { ChatAlt2Icon, ChatAltIcon, ChatIcon, TrashIcon } from "@heroicons/react/outline"
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
    id: string
  }

const ChatRow = ({id}: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const {data: session} = useSession()
    const [active, setActive] = useState(false)

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    )

    // For focusing on active chat

    useEffect(() => {
        if (!pathname) return

        setActive(pathname.includes(id))
    }, [pathname])

    
    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace('/')
    }


  return (
    <Link className={`chatRow overflow-hidden justify-center ${active && 'bg-[#353540]'}`}
    href={`/chat/${id}`}
    >
        <ChatAlt2Icon className="h-5 w-5" />
        <p className="flex-1 md:inline-flex truncate">
            {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
        </p>
        <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-500 hover:text-red-700"/>
    </Link>
  )
}

export default ChatRow