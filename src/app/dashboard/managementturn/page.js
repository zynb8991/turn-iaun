import Table from '@/components/table';
import getTeacherTurns from '@/lib/getTeacherTurns';
import React from 'react'
import moment from 'jalali-moment'
import {Bars3Icon, CheckIcon, XMarkIcon} from '@heroicons/react/24/solid'
import authToken from '@/lib/authToken';
import Status from '@/components/status';

const ManagementTurn = async () => {
    const user = await authToken();
    const teacherTurns = await getTeacherTurns({role: user.role, teacherId: user._id});

  const columns = [
      <th key="0">#</th>,
      (user.role != 'teacher' && <th key="1">مدیرگروه</th>),
      <th key="2">دانشجو</th>,
      <th key="3">تاریخ</th>,
      <th key="4">ساعت</th>,
      <th key="5">وضعیت نوبت</th>,
      <th key="6" className='w-4'>عملیات</th>
  ];

  let rows = [];
  rows = teacherTurns.map((row, index) => {
    let dateTime = moment(row.dateTurn);
    
    return [
      (index + 1),
      (user.role != 'teacher' && <span key={index}>{row.teacherId?.fullName}</span>),
      <span key={index}>{row.userId?.fullName}</span>,
      <span key={index}>{`${dateTime.jYear()}/${dateTime.jMonth() + 1}/${dateTime.jDate()}`}</span>,
      <span key={index}>{`${dateTime.jYear()}/${dateTime.jMonth() + 1}/${dateTime.jDate()}`}</span>,
      (row.status === 0 ? <span className='text-gray-400'>در حال بررسی</span> : row.status === -1 ? <span className='text-red-600'>تایید نشده</span> : <span className='text-green-500'>تایید شده</span>),
      <>
          <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn shadow-none bg-transparent border-none  hover:bg-transparent">
                  <Bars3Icon className='w-7' />
              </div>

              <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 p-0 z-[1] shadow bg-white rounded-box w-52">
                <Status id={row._id} status={row.status} path={'turns'} />
              </ul>
          </div>
      </>
    ]
  })
  return (
    <>
        {teacherTurns && <Table columns={columns} rows={rows} />}
    </>
  )
}

export default ManagementTurn
