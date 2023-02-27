import NavBar from '@/components/NavBar'
import NewChat from '@/components/NewChat'
import { ExclamationIcon, LightningBoltIcon, MenuAlt1Icon, SunIcon } from '@heroicons/react/outline'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full
    px-2 text-[#ECECF1]">

      <h1 className="mt-10 text-4xl font-semibold mb-10">ChatGPT</h1>


    <div className='grid grid-cols-1 gap-8 space-x-2 text-center'>
      <div className='md:grid md:grid-cols-3 gap-4 max-w-[700px]'>
      <div >
        <div className="flex flex-col items-center justify-center mb-5">
          <SunIcon className='h-7 w-7 mb-1' />
          <h2 className='text-lg'>Examples</h2>
        </div> 

      <div className="space-y-2"> 
        <p className="infoText">&quot;Explain something to me&quot; →</p>
        <p className="infoText">&quot;What is the difference between a dog and a cat?&quot; →</p>
        <p className="infoText">&quot;What is the color of the sun?&quot; →</p>
      </div>

      </div>

      <div>
        <div className="flex flex-col items-center justify-center mb-5">
          <LightningBoltIcon className='h-7 w-7 mb-1' />
          <h2 className='text-lg'>Capabilities</h2>
        </div>

      <div className="space-y-2"> 
        <p className="infoText">Change the ChatGPT Model to use</p>
        <p className="infoText">Messages are stored in Firebase&quot;s Firestore</p>
        <p className="infoText">Hot Toast notifications when ChatGPT is thinking!</p>
      </div>

      </div>

      <div>
        <div className="flex flex-col items-center justify-center mb-5">
          <ExclamationIcon className='h-7 w-7 mb-1' />
          <h2 className='text-lg'>Limitations</h2>
        </div>

      <div className="space-y-2"> 
        <p className="infoText">May occasionally generate incorrect information</p>
        <p className="infoText">May occasionally produce harmful instructions or biased content</p>
        <p className="infoText">Limited knowledge of world and events after 2021</p>
      </div>

      </div>
      </div>
    </div>
    </div>

  )
}

export default HomePage