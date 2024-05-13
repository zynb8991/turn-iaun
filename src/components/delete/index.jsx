'use client'

import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const Delete = ({id, path}) => {
  const router = useRouter();
  
  const sendData = async () => {
    const API_URL = `http://localhost:3000/api/${path}/${id}`;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      cache: 'no-store'
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

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger margin-left"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "آیا مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف!",
      cancelButtonText: "خیر، انصراف!",
      reverseButtons: true
    }).then((result) => {
  
      if (result.isConfirmed) {
       sendData();
      } 
    });
  }
  return (
    <li className='border-b border-b-gray-100' onClick={handleDelete}>
      <a className='py-4'><TrashIcon className='w-5 text-red-600' />حذف</a>
    </li>
  )
}

export default Delete