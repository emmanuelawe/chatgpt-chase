'use client'
import { useSession, signOut} from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import ModelSelection from "./ModelSelection"
import { LogoutIcon } from "@heroicons/react/solid"

const SideBar = () => {
const {data: session} = useSession()

const [chats, loading, error] = useCollection(
  session && query(collection(db, 'users', session.user?.email!, 'chats'),
  orderBy('createdAt', 'asc'))
)


  
  return (
    <div className="p-2 hidden md:flex flex-col h-screen">
       <div className="flex-1">
        <div>
            {/* New Chat */}
            <NewChat />

            <div className="hidden sm:inline">
                {/* Modal Selection */}
              <ModelSelection />
            </div>

            <div className="flex flex-col space-y-2 my-2 overflow-y-auto">

              {loading && (
                <div className="animate-pulse text-center text-[#ECECF1]">
                  <p>Loading Chats...</p>
                  </div>
              )}
            {/* Map through the Chat Rows */}
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
            </div>
        </div>
       </div>
       {session && (
        <div onClick={() => signOut()}
        className='flex items-center justify-center mx-6 cursor-pointer mb-4'
        >
          <div className="flex text-[#ECECF1] flex space-x-2 text-sm items-center">
          <LogoutIcon className="h-4 w-4 mt-0.5"/>
          <p>Log out</p>
          </div>
        <img 
        src={session.user?.image!} alt="Profile pic" 
        className="mt-2 h-7 w-7 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
        </div>
       )}
        </div>
  )
}

export default SideBar