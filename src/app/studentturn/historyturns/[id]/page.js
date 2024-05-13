import Table from '@/components/table'
import getRezervTurns from '@/lib/getRezervTurns';
import React from 'react'
import moment from 'jalali-moment'

const HistoryTurns = async ({params}) => {
  const rezervTurns = await getRezervTurns(params.id);

    const columns = [
        <th key="0">#</th>,
        <th key="1">مدیرگروه</th>,
        <th key="2">تاریخ</th>,
        <th key="3">ساعت</th>,
        <th key="4">وضعیت نوبت</th>
    ];

    let rows = [];
    rows = rezervTurns.map((row, index) => {
      let dateTime = moment(row.dateTurn);
      
      return [ 
        (index + 1),
        row.teacherId.fullName,
        `${dateTime.jYear()}/${dateTime.jMonth() + 1}/${dateTime.jDate()}`,
        `${dateTime.hour()}:${dateTime.minute() < 10 ? '0' + dateTime.minute() : dateTime.minute()}`,
        (row.status === 0 ? <span className='text-gray-400'>در حال بررسی</span> : row.status === -1 ? <span className='text-red-600'>تایید نشده</span> : <span className='text-green-500'>تایید شده</span>)
    ]
  })
  
  return (
    <>
        <div className='flex items-center justify-center w-full h-full p-6'>
          {rezervTurns && <Table columns={columns} rows={rows} />}
        </div>
    </>
  )
}

export default HistoryTurns