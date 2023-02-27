'use client'


import { db } from "@/firebase"
import { MenuAlt1Icon, MenuAlt2Icon, MenuIcon, PlusIcon, XIcon } from "@heroicons/react/outline"
import { LogoutIcon } from "@heroicons/react/solid"
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import ChatRow from "./ChatRow"
import ModelSelection from "./ModelSelection"
import NewChat from "./NewChat"

const NavBar = () => {
    const router = useRouter()
  const {data: session} = useSession()
  const [nav, setNav] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

const [chats, loading, error] = useCollection(
  session && query(collection(db, 'users', session.user?.email!, 'chats'),
  orderBy('createdAt', 'asc'))
)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else
      setIsScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    
  }, [])


  const createNewChat = async () => {
    const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'chats', ), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    })

    router.push(`/chat/${doc.id}`)
  }

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className={`${isScrolled && 'bg-[#353540]'} bg-[#353540] fixed top-0 w-full p-2 px-4 mb-8 justify-between items-center md:hidden flex text-md text-[#ECECF1] border h-10 border-gray-600`}>
        <MenuIcon onClick={handleNav} className='h-6 w-6'/>
        <p>New Chat</p>
        <div>
          <div onClick={createNewChat} className='cursor-pointer' >
        <PlusIcon className="h-6 w-6" />
          </div>
        

        {/* The slide animation of the Side bar when Menu Icon is clicked */}

        <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/10' : ''}>
    <div className={nav ? 'fixed left-0 top-0 w-[65%] sm:w-[60%] md:w-[45%] h-screen bg-[#212023]  px-8 ease-in duration-500' 
    : 'fixed left-[-100%] top-0 ease-in duration-500'}>
        
        <div className="flex flex-col h-screen">
        <div className="flex-1">
        <div>
            <div className="flex justify-between mt-4 space-x-4">
            {/* New Chat */}
            <div className="flex-1">
            <NewChat />
            </div>

            <XIcon onClick={handleNav} className='h-6 w-6 mt-2 '/>
            </div>

            <div className=" sm:inline">
                {/* Modal Selection */}
              <ModelSelection />
            </div>

            <div className="flex flex-col space-y-2 my-2 scrollbar-hide overflow-y-auto max-h-80">

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
          <div className="text-[#ECECF1] flex space-x-2 text-sm items-center">
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

        </div>
    </div>

    </div>

      </div>
  )
}

export default NavBar