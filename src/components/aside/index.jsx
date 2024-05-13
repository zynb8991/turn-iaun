'use client'

import { useContext } from 'react'
import Menu from './menu'
import { LoginContext } from '@/context'

const Aside = ({user}) => {
  const {open, handleOpen} = useContext(LoginContext);

  const handleCloseMenu = (e) => {
    e.stopPropagation();
  }
  return (
   
    <div className={`absolute ${open ? 'block' : 'hidden'} w-full h-full bg-black/50 z-50 lg:relative lg:block lg:w-fit lg:h-fit`} onClick={handleOpen}>
      <div className='flex flex-col gap-5 shrink-0 w-[265px] h-screen bg-primary text-white' onClick={handleCloseMenu}>
        <div className='flex flex-col justify-center items-center gap-2 shadow1 m-4 p-2 bg-[#07325f] rounded-[50px]'>
          <h1 className='text-l lg:text-xl'>سامانه نوبت دهی</h1>
          <span className='text-xs'>دانشگاه آزاد نجف آباد</span>
        </div>
        
        <Menu user={user} />
      </div>
    </div>

 )
}

export default Aside