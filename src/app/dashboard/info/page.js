import React from 'react'
import getInfos from '@/lib/getInfos';
import {Bars3Icon, PencilSquareIcon} from '@heroicons/react/24/outline'
import Table from '@/components/table';
import Delete from '@/components/delete';
import Link from 'next/link';


const ListInfo = async () => {
    const infos = await getInfos();
    

    const columns = [
        <th className='w-14' key={0}>#</th>, 
        <th className='w-40' key={1}>کد</th>, 
        <th className='' key={2}>عنوان</th>, 
        <th className='w-36' key={3}>سردسته</th>, 
        <th className='w-2' key={4}>عملیات</th>
    ];
    let rows = [];
    if(infos) {
        rows = infos.map((row, index) => 
            [ 
                (index + 1),
                row.code,
                row.title,
                row.infoId?.title || "-",
                <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn shadow-none bg-transparent border-none  hover:bg-transparent">
                            <Bars3Icon className='w-7' />
                        </div>
                        <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 p-0 z-[1] shadow bg-white rounded-box w-52">

                        <li className='border-b border-b-gray-100'>
                            <Link href={`/dashboard/info/edit/${row._id}`} className='py-4'>
                                <PencilSquareIcon className='w-5' />ویرایش
                            </Link>
                        </li>
                        <Delete path='infos' id={row._id} />
                        </ul>
                    </div>
                </>
            ]
        )
      }

  return (
    <>
        {infos && <Table columns={columns} rows={rows} />}
    </>

  )
}

export default ListInfo