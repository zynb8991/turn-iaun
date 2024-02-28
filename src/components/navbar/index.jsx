'use client'

import { LoginContext } from '@/context';
import {  
  PencilSquareIcon, 
  UserIcon, 
  BellIcon ,
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useContext } from 'react';

const Navbar = () => {
    const {open, handleOpen} = useContext(LoginContext);
  return (
    <div className="navbar bg-white shadow2 text-primary lg:px-10">
        <div className="flex-1">
            <button className="btn btn-ghost lg:hidden" onClick={handleOpen}>
                <Bars3Icon className="w-7" />
            </button>
            <a className="btn btn-ghost text-lg lg:text-xl">صفحه اصلی</a>
        </div>
        
        <div className="flex-none gap-5">
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn bg-transparent border-none shadow-none hover:bg-transparent">
            <div className="indicator">
                <BellIcon className='w-7 text-primary hover:text-secondary' />
                <span className="badge badge-sm indicator-item bg-secondary text-white border-none">8</span>
            </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow">
            <div className="card-body">
                <span className="font-bold text-base">تست</span>
                <div className="card-actions">
                <button className="btn bg-primary btn-block text-white border-none hover:bg-secondary">مشاهده</button>
                </div>
            </div>
            </div>
        </div>
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle shadow-none bg-transparent border-none avatar hover:bg-transparent">
            <div className="w-9 rounded-full shadow3">
                <img src='images/User-avatar.png' />
            </div>
            </div>
            <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 p-0 z-[1] shadow bg-white rounded-box w-52">
            <li className='text-center border-b border-b-gray-100 py-3 text-base'>
                تست تستی
                <br />
                ادمین
            </li>
            
            <li className='border-b border-b-gray-100'>
                <a className='py-4'>
                <UserIcon className='w-5' />
                پروفایل
                </a>
            </li>

            <li className='border-b border-b-gray-100'>
                <a className='py-4'>
                <PencilSquareIcon className='w-5' />
                ویرایش
                </a>
            </li>

            <li className='border-b border-b-gray-100'>
                <a className='py-4'>
                <Cog6ToothIcon className='w-5' />
                تنظیمات
                </a>
            </li>

            <li className='text-red-500'>
                <a className='py-4'>
                <ArrowLeftEndOnRectangleIcon className='w-5' />
                خروج از حساب کاربری
                </a>
            </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Navbar