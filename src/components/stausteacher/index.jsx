'use client'

import React from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const StatusTeacher = ({id, status}) => {
  const router = useRouter();
  
  const sendData = async () => {
    const API_URL = `http://localhost:3000/api/users/status/${id}`;
    const response = await fetch(API_URL, {
      method: 'PUT',
      cache: 'no-store',
      body:  JSON.stringify({active: status})
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

  const handleStatusTeacher = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger margin-left"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: (status == "1" ? "آیا میخواهید کاربر را فعال کنید؟" : "آیا میخواهید کاربر را غیرفعال کنید؟"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله!",
      cancelButtonText: "خیر!",
      reverseButtons: true
    }).then((result) => {
  
      if (result.isConfirmed) {
       sendData();
      } 
    });
  }

  return (
    <li className='border-b border-b-gray-100' onClick={handleStatusTeacher}>
      {status == "0" ? <a className='py-4'>غیرفعال کردن</a> : <a className='py-4'>فعال کردن</a>}
    </li>
  )
}

export default StatusTeacher