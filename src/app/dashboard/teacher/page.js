import React from 'react'
import getTeacher from '@/lib/getTeachers';
import {Bars3Icon, PencilSquareIcon, CalendarIcon} from '@heroicons/react/24/outline'
import Table from '@/components/table';
import Delete from '@/components/delete';
import StatusTeacher from '@/components/stausteacher';
import Link from 'next/link';


const ListTeacher = async () => {
    const teachers = await getTeacher();
    
    // ستون های مربوط به جدول لیست مدیرگروههها
    const columns = [
        <th className='w-14' key={0}>#</th>, 
        <th className='' key={1}>نام و نام خانوادگی</th>, 
        <th className='w-44' key={2}>شماره پرسنلی</th>, 
        <th className='' key={3}>ایمیل</th>, 
        <th className='w-44' key={4}>مقطع (رشته)</th>, 
        <th className='w-2' key={5}>عملیات</th>
    ];

    // ایجاد سطرهای جدول
    let rows = [];
    if(teachers) {
        rows = teachers.map((row, index) => 
            [ 
                (index + 1),
                <span key={index} className='text-[16px]'>{row.fullName}</span>,
                <span key={index} className='text-[16px]'>{row.personnelCode}</span>,
                <span key={index} className='text-[16px]'>{row.email}</span>,
                <>
                    {row.sectionsId.map((sec, index) => <p key={index} className='text-[15px]'>{sec.infoId.title} ({sec.infoId.infoId.title})</p>)}
                </>,
                <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn shadow-none bg-transparent border-none  hover:bg-transparent">
                            <Bars3Icon className='w-7' />
                        </div>
                        <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 p-0 z-[1] shadow bg-white rounded-box w-52">

                            <li className='border-b border-b-gray-100'>
                                <Link href={`/dashboard/teacher/edit/${row._id}`} className='py-4'>
                                    <PencilSquareIcon className='w-5 text-secondary' />ویرایش
                                </Link>
                            </li>
                            
                            <StatusTeacher id={row._id} status={row.active == 1 ? "0" : "1"} />

                            <li className='border-b border-b-gray-100'>
                                <Link href={`/dashboard/teacher/userturns/${row._id}`} className='py-4'>
                                    <CalendarIcon className='w-5 text-blue-600' />تعیین نوبت
                                </Link>
                            </li>
                            <Delete path='users' id={row._id} />
                        </ul>
                    </div>
                </>
            ]
        )
      }

  return (
    <>
        {teachers && <Table columns={columns} rows={rows} />}
    </>

  )
}

export default ListTeacher