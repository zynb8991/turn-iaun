'use client'

import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const Status = ({id, status, path = ""}) => {
  const router = useRouter();
  
  const sendData = async (stus) => {
    const API_URL = `http://localhost:3000/api/${path}/${id}`;
    const response = await fetch(API_URL, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify({status: stus})
    });
    if(!response.ok) {
      Swal.fire({
        position: "top-start",
        icon: "error",
        title: "خطای سرور",
        text: "خطایی رخ داده است.",
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      const data = response.json();
      if(data.error) {
        Swal.fire({
          position: "top-start",
          icon: "error",
          title: "خطای سرور",
          text: "خطایی رخ داده است.",
          showConfirmButton: false,
          timer: 2000
        });
      }else {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "موفقیت آمیز!",
          text: "عملیات با موفقیت انجام گردید.",
          showConfirmButton: false,
          timer: 2000
        });
      
        router.refresh();
      }
    }
  }

  const handleChangeStatus = (stus) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger margin-left"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: (stus === 1 ? "آیا از تایید این نوبت مطمئن هستید؟" : "آیا از عدم تایید این نوبت مطمئن هستید؟"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله!",
      cancelButtonText: "خیر!",
      reverseButtons: true
    }).then((result) => {
  
      if (result.isConfirmed) {
       sendData(stus);
      } 
    });
  }
  return (
    <>
      {
        status === 1 ? (
            <li className='border-b border-b-gray-100 flex items-center cursor-pointer' onClick={() => handleChangeStatus(-1)}><span className='text-red-500 w-full py-4'>تایید نشد</span></li>
        ) : status === -1 ? (
            <li className='border-b border-b-gray-100 flex items-center cursor-pointer' onClick={() => handleChangeStatus(1)}><span className='text-green-500 w-full py-4'>تایید شد</span></li>
        ) : (
            <>
                <li className='border-b border-b-gray-100 flex items-center cursor-pointer' onClick={() => handleChangeStatus(1)}><span className='text-green-500 w-full py-4'>تایید شد</span></li>
                <li className='border-b border-b-gray-100 flex items-center cursor-pointer' onClick={() => handleChangeStatus(-1)}><span className='text-red-500 w-full py-4'>تایید نشد</span></li>
            </>
        )
      }
    </>
  )
}

export default Status