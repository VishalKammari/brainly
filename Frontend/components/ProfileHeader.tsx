import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProfileHeader = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        console.log(token)
        console.log(JSON.parse(atob(token.split('.')[1])))
        setUsername(decoded.id || 'User')
      } catch {
        setUsername('User')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }



  return (
  <div className="absolute top-4 right-4 z-20">
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl 
                    bg-white/10 backdrop-blur-md border border-white/20 shadow-md">

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full 
                      bg-white/20 text-white flex items-center justify-center 
                      text-sm font-semibold">
        {username.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex flex-col leading-tight">
        <p className="text-sm font-medium text-white">
          {username}
        </p>

        <button
          onClick={handleLogout}
          className="text-xs text-white/70 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)








  // return (
  //   <div className='flex items-center gap-4 absolute top-4 right-4'>
  //     <div className='text-right'>
  //       <p className='font-medium text-slate-800'>{username}</p>
  //       <button
  //         onClick={handleLogout}
  //         className='text-sm text-purple-600 hover:text-purple-700 transition'
  //       >
  //         Logout
  //       </button>
  //     </div>
  //     <div className='w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold'>
  //       {username.charAt(0).toUpperCase()}
  //     </div>
  //   </div>
  // )
}

export default ProfileHeader
