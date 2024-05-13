import Clock from '@/components/clock';
import { CalendarDaysIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/solid';

export default function Home() {

  return (
    <>
      <div className='w-container relative'>
        <div className="flex w-full bg-white py-8 px-5 border-border-color border rounded-lg  justify-center items-center border-slate-300">
          <div className='flex flex-col items-center gap-8 py-10 bg-gray-100 w-[1200px] border rounded-lg'>
            <p className='text-primary text-2xl font-bold'>خوش آمدید</p>
            <div className='w-[90%] h-[1px] bg-gray-300'></div>
            {<Clock />}
          </div>
        </div>
      </div>
    </>
  );
}
