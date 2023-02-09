import NewChat from "./NewChat"


const SideBar = () => {
  return (
    <div className="p-2 flex flex-col h-scree">
       <div className="flex-1">
        <div>
            {/* New Chat */}
            <NewChat />

            <div>
                {/* Modal Selection */}
            </div>

            {/* Map through the Chat Rows */}

        </div>

       </div>
        </div>
  )
}

export default SideBar