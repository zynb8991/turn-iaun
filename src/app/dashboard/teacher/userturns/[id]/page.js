'use client'

import SelectBox from '@/components/selectbox'
import React, { useEffect, useState } from 'react'
import {PlusCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'
import useTurnUser from '@/hooks/useTurnUser'

const Userturn = ({params}) => {
  const [getDataLoading, setGetDataLoading] = useState(true);
  const {loading, editTurn} = useTurnUser();
  const [formData, setFormData] = useState([{
    day: "",
    startHour: "",
    startMinute: "",
    endHour: "",
    endMinute: ""
  }]);

  const days = [
    { value: "", title: "روز را انتخاب کنید", optGroup: null },
    { value: "0", title: "شنبه", optGroup: null },
    { value: "1", title: "یک شنبه", optGroup: null },
    { value: "2", title: "دوشنبه", optGroup: null },
    { value: "3", title: "سه شنبه", optGroup: null },
    { value: "4", title: "چهارشنبه", optGroup: null },
    { value: "5", title: "پنج شنبه", optGroup: null }
  ];

  const hours = [
    { value: "", title: "ساعت", optGroup: null },
    { value: "08", title: "08", optGroup: null },
    { value: "09", title: "09", optGroup: null },
    { value: "10", title: "10", optGroup: null },
    { value: "11", title: "11", optGroup: null },
    { value: "12", title: "12", optGroup: null },
    { value: "13", title: "13", optGroup: null },
    { value: "14", title: "14", optGroup: null },
    { value: "15", title: "15", optGroup: null },
    { value: "16", title: "16", optGroup: null }
  ];

  const minutes = [
    { value: "", title: "دقیقه", optGroup: null },
    { value: "00", title: "00", optGroup: null },
    { value: "15", title: "15", optGroup: null },
    { value: "30", title: "30", optGroup: null },
    { value: "45", title: "45", optGroup: null }
  ];

  

  // برای افزودن مقطع جدید یعنی ایجاد یک سطر وقتی روی بعلاوه میزنم
  const addNewRow = () => {
    setFormData((oldRow) => [...oldRow, {
      day: "",
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: ""
    }]);
  }

  // حذف سطر برای ایجاد مقطع جدید برای هر مدیرگروه
  const removeRow = (id) => {
    setFormData((prevData) => prevData.filter((sec, index) => index != id));
  }

  // تغییر سلکت باکس ها، مقادیر رار بگیرد بریزد داخل متغیر و ...
  const handleChange = (index, e) => {
    const oldData = formData[index];
    let newData = {...oldData, [e.target.name]: e.target.value};

    // اطلاعات رو ست میکنیم
    setFormData((prevData) => prevData.map((data, mapIndex) => mapIndex == index ? newData : data));
  }

  
  // برای اافزودن و ذخیره اطلاعات مدیرگروه
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = formData.map((prevData) => {
      return {
        day: prevData.day, 
        startHour: ((60 * 60 * prevData.startHour) + (60 * prevData.startMinute)),
        endHour: ((60 * 60 * prevData.endHour) + (60 * prevData.endMinute))
      }
    })
    await editTurn({userId: params.id, turns: newData});
  }

  const getData = async () => {

    // api for get info
    const API_URL = `http://localhost:3000/api/userturns/${params.id}`;
    const res = await fetch(API_URL, {
        method: 'GET',
        cache: 'no-store'
    });

    if(!res.ok) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: "هنگام دریافت اطلاعات خطایی رخ داده است."
        }, {
            status: 400
        })
    }

    // اطلاعات را بصورت جیسون به سمت ما بفرستد
    const data = await res.json();
    if(data.error) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: "هنگام دریافت اطلاعات خطایی رخ داده است."
        }, {
            status: 400
        })
    }

    const newData = data.data.map((info) => {
      const startHour = Math.floor(info.startHour / 3600); 
      const startMinute = (Math.abs((info.startHour / 3600) - startHour)) * 60; 
      
      const endHour = Math.floor(info.endHour / 3600); 
      const endMinute = (Math.abs((info.endHour / 3600) - endHour)) * 60; 
      
      return {
        day: `${info.day}`, 
        startHour: startHour < 10 ? `0${startHour}` : `${startHour}`,
        startMinute: startMinute < 10 ? `0${startMinute}` : `${startMinute}`, 
        endHour: endHour < 10 ? `0${endHour}` : `${endHour}`,
        endMinute: endMinute < 10 ? `0${endMinute}` : `${endMinute}`,
      }
    });
    setFormData(newData);
    setGetDataLoading(false);
  }

  useEffect(() => {
    if(getDataLoading) getData();
})


  return (
    <form onSubmit={handleSubmit} className='flex flex-col md:gap-3'>
        <div className='form-container'>
          {
            formData.map((row, index) => 
              <>
                <div className='row' key={index}>
                  <div className='column'>
                      <span className='title-input'>روز:</span>
                      <SelectBox name='day' options={days} selected={row.day} onChange={(e) => handleChange(index, e)} />
                  </div>

                  <div className='column'>
                      <span className='title-input'>تعیین ساعت:</span>
                      <div className='row items-center'>
                        <span className='title-input'>از:</span>
                        <div className='column'>
                          <SelectBox name='startMinute' options={minutes} selected={row.startMinute} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <span className='title-input'>:</span>
                        <div className='column'>
                          <SelectBox name='startHour' options={hours} selected={row.startHour} onChange={(e) => handleChange(index, e)} />
                        </div>
                      </div>
                  </div>

                  <div className='column'>
                      <span className='title-input'>&nbsp;</span>
                      <div className='row items-center'>
                        <span className='title-input'>تا:</span>

                        <div className='column'>
                          <SelectBox name='endMinute' options={minutes} selected={row.endMinute} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <span className='title-input'>:</span>
                        <div className='column'>
                          <SelectBox name='endHour' options={hours} selected={row.endHour} onChange={(e) => handleChange(index, e)} />
                        </div>
                      </div>
                  </div>

                  <div className='flex items-center'>
                    <span className='title-input'>&nbsp;</span>
                    {index === (formData.length - 1) ? (
                        <button type='button' id={index} className='flex items-center justify-center w-8 top-[15px] relative' onClick={addNewRow}>
                            <PlusCircleIcon className='w-8 text-green-600' />
                        </button> 
                    ) : (
                        <button type='button' id={index} className='flex items-center justify-center w-8 top-[15px] relative' onClick={() => removeRow(index)}>
                            <XCircleIcon className='w-8 text-rose-600' />
                        </button>
                    )}
                  </div>
                </div>
              </>
            )
          }
            
        </div>

        <div className='row'>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'></div>
            <div className='column'>
              <button className='btn btn-md h-55 bg-primary border-none text-white text-base' disabled={loading}>
                    {loading ? <span className='loading loading-dots'></span> : "ویرایش / افزودن"}
                </button>
            </div>
        </div>
    </form>
  )
}

export default Userturn
