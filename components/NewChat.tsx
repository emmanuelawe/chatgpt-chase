import { db } from "@/firebase"
import { PlusIcon } from "@heroicons/react/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



const NewChat = () => {
  const router = useRouter()
  const {data: session} = useSession()

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'chats', ), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    })

    router.push(`/chat/${doc.id}`)
  }

  return (
    <div onClick={createNewChat} className="border-gray-600 border rounded-md px-5 py-3 text-sm  flex items-center -justify-end space-x-2 hover:bg-gray-700/70 cursor-pointer text-[#ECECF1] transition-all duration-200 ease-out">
        <PlusIcon className="h-4 w-4" />
        <p>New Chat</p>
    </div>
  )
}

export default NewChat