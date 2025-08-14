import { Star } from 'lucide-react'
import { assets } from '../assets/assets'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Background Image */}
      <img src={assets.background} alt="background"
        //className='absolute top-0 left-0 -z-1 w-full h-full object-cover' 
         className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" 
      />

      {/* left side: Branding */}
      <div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40'>
        <img src={assets.logo} alt="logo"
          className='h-12 object-contain' />
        <div>
          <div className='flex items-center gap-3 mb-4 max-md:mt-10'>
            <img src={assets.group_users} alt="" className='h-8 md:h-10' />
            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, i) => (<Star key={i}
                  className='size md:size-4.5 text-transparent fill-amber-500'
                />
                ))}
              </div>
              <p>Used by 12k+ developers</p>
            </div>
          </div>

          <h1 className='text-3xl md:text-6xl md:pb-2 font-bold
          text-primaryBlack bg-clip-text'>More than just friends truly connect</h1>
          <p className='text-xl md:text-3xl text-primaryBlack/80 max-w-72 md:max-w-md'>Connect with global community on Vibio.</p>
        </div>
        <span className='md:h-10'></span>
      </div>

      {/* Right side: Login form */}
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10'>
        <SignIn />
      </div>
    </div>
  )
}

export default Login