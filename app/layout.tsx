import { SessionProvider } from '@/components/SessionProvider'
import SideBar from '@/components/SideBar'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'
import NavBar from '@/components/NavBar'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ): (
        <div className='flex'>
          <div className='bg-[#212023] max-w-xs h-screen 
          md:min-w-[16.4rem]'>
      <SideBar />
          </div>

      {/* Client Provider - Notification */}
      <ClientProvider />

      <div className='bg-[#353540] flex-grow md:flex-1'>
        <NavBar />
      {children}
      </div>
        </div>
        )}
      </SessionProvider>
        </body>
    </html>
  )
}
