import authToken from '@/lib/authToken';
import { Bars3Icon } from '@heroicons/react/24/outline';
import LogOut from '../logout';

const Navbar = async () => {
    const user = await authToken();
  return (
    <div className="navbar bg-white shadow2 text-primary lg:px-10">
        <div className="flex-1">
            <button className="btn btn-ghost lg:hidden">
                <Bars3Icon className="w-7" />
            </button>
            {/* <sapn className="btn btn-ghost text-lg lg:text-xl">صفحه اصلی</sapn> */}
        </div>
        
        <div className="flex-none gap-5">
        
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle shadow-none bg-transparent border-none avatar hover:bg-transparent">
                <div className="w-9 rounded-full shadow3">
                    <img src='images/User-avatar.png' />
                </div>
                </div>
                <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 p-0 z-[1] shadow bg-white rounded-box w-52">
                    <li className='text-center border-b border-b-gray-100 py-3 text-base'>
                        {user?.fullName}
                    </li>

                    <LogOut />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar