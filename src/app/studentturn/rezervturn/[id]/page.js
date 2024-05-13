'use client'

import SelectBox from '@/components/selectbox'
import React, { useState, useEffect, useSyncExternalStore, useCallback } from 'react'
import useGetInfos from '@/hooks/useGetInfos'
import Link from 'next/link'
import moment from 'jalali-moment'
import {ArrowLongRightIcon, ArrowLongLeftIcon} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'


const AddTurnStudent = () => {
  //  for get userId for show in url
  const userId = useParams().id;

  // متغیرهای مربوط به قسمت تقویم انتخاب نوبت توسط دانشجو
  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState(moment(date, 'M').locale('fa').format('M'));
  const [currentYear, setCurrentYear] = useState(moment(date, 'YYYY').locale('fa').format('YYYY'));
  const [showMonth, setShowMonth] = useState('');
  const [calendar, setCalendar] = useState([]);
  
  const {getInfos} = useGetInfos();
  const [infos, setInfos] = useState(null);
  const [optInfos, setOptInfos] = useState({ // در قسمت سمت راست لیست دانشکده ا و رشته ها ومقاطع نشان داده می شود و همچنین دانشکده و رشته و مقطع انتخاب شده را  نشان می دهد
    college: null,
    major: null,
    section: null,
    optCollege: [{
      value: "",
      title: "دانشکده را انتخاب کنید",
      optGroup: null
    }],
    optMajor: [{
      value: "",
      title: "رشته را انتخاب کنید",
      optGroup: null
    }],
    optSection: [{
      value: "",
      title: "مقطع را انتخاب کنید",
      optGroup: null
    }]
  });

  const [turnTeacher, setTurnTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);

  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState({day: null, month: null, year: null, week: null});

  const [rezervTurns, setRezervTurns] = useState();


  // دریافت لیست دانشکده رشته ها و مقاطع
  const getData = async () => {
      const serverData = await getInfos();
      if(serverData) {
          setInfos(serverData);
          handleOptInfos(null, "college", serverData);
      }
  }

  // برای پر کردن فیلدهای ورود دانشجو به صفحه نوبتها
  const handleOptInfos = (e, type = "", dataInfos = null) => {
    let newData = optInfos;
    if(e) {
      newData = {...newData, [e.target.name]: e.target.value};
    }

    if(type === "college") {
      // اگه دانشکده بود میاد اطلاعات قبلی رو وارد میکنه و فیلد optCollege رو دیتای جدید رو میزاریم
      newData = {...newData, optCollege: [{
        value: "",
        title: "دانشکده را انتخاب کنید",
        optGroup: null
      },
      ...dataInfos.map((info) => (
        {
          value: info._id,
          title: info.title,
          optGroup: null
        }
      ))], 
      major: null,
      section: null,
      optSection: [{
        value: "",
        title: "مقطع را انتخاب کنید",
        optGroup: null
      }]};

    }else if(type === "major") {
      // فیلتر میزنه ببینه این دانشکده توی دانشکده ها هست یا نه
      const opts = infos.filter((opt) => e.target.value === opt._id);
      newData = {...newData, optMajor: [{
          value: "",
          title: "رشته را انتخاب کنید",
          optGroup: null
      },
      // برای اینکه به فرزندانش دسترسی داشته باشیم
      ...opts[0]?.infosId.map((opt) => (
          {
              value: opt._id,
              title: opt.title,
              optGroup: null
          }
      ))]};
    }else if(type === "section") {
      // ببینیم اون رشته بین رشته ها هست یا نه
      const majorOfCollege = infos.filter((opt) => newData.college === opt._id);
      // برای اینکه به فرزندانش دست پیدا کنیم تا بتونیم مقاطع رو بیاوریم
      const opts = majorOfCollege[0].infosId.filter((opt) => e.target.value === opt._id);
      newData = {...newData, optSection: [{
          value: "",
          title: "مقطع را انتخاب کنید",
          optGroup: null
      },
      // برای اینکه به فرزندانش دسترسی داشته باشیم
      ...opts[0]?.infosId.map((opt) => (
          {
              value: opt._id,
              title: opt.title,
              optGroup: null
          }
      ))]};
    }
    
    // اطلاعات رو ست میکنیم
    setOptInfos(newData);

  }

  
// گرفتن نوبتهای استاد براساس سکشنی که دانشجو سلکت کرده است
const getTurnTeacher = async () => {
  setLoading(true);
  const API_URL = `http://localhost:3000/api/users/getteacherturn/${optInfos.section}`;
  const res = await fetch(API_URL, {
     method: 'GET',
     cache: 'no-store'
  });
    if(!res.ok) {
      toast.error('خطای سرور رخ داده است.');
    }else {
      const data = await res.json();
      if(data.data.length === 0) {
        toast.error('برای این استاد نوبتی مشخص نشده است');
      }else {
        setTurnTeacher(data.data);
        createDaysOfTheMonth(data.data);
      }
    }

    setLoading(false);
}

// روی روز مورد نظر کلیک کرده و ساعتای مربوط به ان را نشان می دهد
const selectingDay = (e) => {
  const day = {day: (e.target.getAttribute('data-day') * 1), month: (e.target.getAttribute('data-month') * 1), year: (e.target.getAttribute('data-year') * 1), week: (e.target.getAttribute('data-week') * 1)}
  setSelectedDay(day);

  const timesOfDay = turnTeacher.filter((turn) => turn.day == (e.target.getAttribute('data-week') * 1));
  let btnsTime = [];
  for(let i = timesOfDay[0].startHour; i <= timesOfDay[0].endHour; i+= (60 * 15)) {
    const convertTime = i / 3600;
    const hour = Math.floor(convertTime);
    const minute = (convertTime - hour) * 60;

    // ایجاد تاریخ و روز و ماه فعلی و تبدیل آن به فرمت محلی و سپس به فرمت جهانی
    const thisDate = ((moment(moment(`${currentYear}/${currentMonth}/${e.target.getAttribute('data-day')} ${hour}:${minute}`, 'jYYYY/jM/jD HH:mm').toDate(), 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')).local()).toISOString();

    // ایجاد دکمه های ساعت بریا روز انتخاب شده و گذاشتن شرط که اگر ان ساعت انتخاب شده نشانش ندهد
    const hasTurn = rezervTurns.filter((turn) => turn.dateTurn == thisDate);
    if(!hasTurn.length) btnsTime = [...btnsTime, `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`];
  }
  setTimes(btnsTime);
}

  // گرفتن نوبت های رزرو شده برای این ماه
  const getRezervTurnForThisMonth = async () => {
    const startDate = moment(`${currentYear}/${currentMonth}/1 01:00`, 'jYYYY/jM/jD HH:mm');
    const endDate = moment(`${currentYear}/${currentMonth}/${startDate.jDaysInMonth()} 00:00`, 'jYYYY/jM/jD HH:mm');

    // api for get turns for a month
    const API_URL = `http://localhost:3000/api/rezervturns/${optInfos.section}?startDate=${startDate.toDate()}&endDate=${endDate.toDate()}`;
  
    const res = await fetch(API_URL, {
        method: 'GET',
        cache: 'no-store'
    });

    if(!res.ok) {
      toast.error('خطای سرور رخ داده است.');
    }else {
      const data = await res.json();
      if(data.error) {
        toast.error(data.message);
      }else {
        setRezervTurns(data.data);
      }
    }
    
  }
  
  // برای ساخت سطر و ستون تقویم
  const createDaysOfTheMonth = (turnTeacherList, action = null) => {
    getRezervTurnForThisMonth();
    setCalendar([]);
    let month = currentMonth * 1;
    let year = currentYear * 1;

    if(action === "next") {
      if(month === 12) {
        month = 1;
        year++;
      }else {
        month++;
      }
    }
    if(action === "prev") {
      if(month === 1) {
        month = 12;
        year--;
      }else {
        month--;
      }
    }

    const firstOfMonth = moment(`${year}/${month}/1`, 'jYYYY/jM/jD');
    const numRow = Math.ceil((firstOfMonth.jDaysInMonth() + firstOfMonth.jDay()) / 7);
    let day = 1;
    for(let i = 1; i <= numRow; i++) {
      for(let j = 0; j < 7; j++) {
        const dateOfDay = moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD');
        let spanElm = <span></span>;
        if(day <= firstOfMonth.jDaysInMonth() && dateOfDay.jDay() === j) {
          const hasTurn = turnTeacherList.filter((turn) => turn.day == j);
          if(hasTurn.length) {
            spanElm = <span className={`hasTurn ${selectedDay.week === j && selectedDay.day === day && selectedDay.month === month && selectedDay.year === year && 'selected-day'}`} key={day} data-day={day} data-month={month} data-year={year} data-week={j} onClick={selectingDay}>{day}</span>;
          }else {
            spanElm = <span key={day}>{day}</span>;
          }
          
          day++;
        }
        setCalendar((prevData) => [...prevData, spanElm]);
      }
    }
    
    setCurrentMonth(month);
    setCurrentYear(year);
    setShowMonth(`${firstOfMonth.locale('fa').format('jMMMM')} ${firstOfMonth.locale('fa').format('jYYYY')}`)
  }

  const reset = () => {
    const colleges = optInfos.optCollege;

    setCurrentMonth(moment(date, 'M').locale('fa').format('M'));
    setCurrentYear(moment(date, 'YYYY').locale('fa').format('YYYY'));
    setShowMonth('');
    setCalendar([]);
    setOptInfos({ 
      college: null,
      major: null,
      section: null,
      optCollege: colleges,
      optMajor: [{
        value: "",
        title: "رشته را انتخاب کنید",
        optGroup: null
      }],
      optSection: [{
        value: "",
        title: "مقطع را انتخاب کنید",
        optGroup: null
      }]
    });
    setTurnTeacher(null);
    setTimes([]);
    setSelectedTime(null);
    setSelectedDay({day: null, month: null, year: null, week: null});
  }

  const selectingTime = (time) => {
    setSelectedTime(time);
  }

  // ارسال نوبت هایی که دانشجو انتخاب کرده است
  const sendData = async () => {
    const jDate = moment(`${currentYear}/${currentMonth}/${selectedDay.day} ${selectedTime}`, 'jYYYY/jM/jD HH:mm').toDate();

    const newData = {userId, teacherId: turnTeacher[0].userId._id, dateTurn: jDate};
    setLoadingSendData(true);

    const API_URL = `http://localhost:3000/api/rezervturns`;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newData)
    });

    if(!res.ok) {
      toast.error('خطای سرور رخ داده است.');
    }else {
      const data = await res.json();
      if(data.error) {
        toast.error(data.message);
      }else {
        toast.success('نوبت شما با موفقیت ثبت گردید.');
      }
    }

    setLoadingSendData(false);
  }
  
  useEffect(() => {
    if(!infos) getData();
    if(turnTeacher) createDaysOfTheMonth(turnTeacher);
  }, [currentMonth, currentYear, selectedDay, rezervTurns, turnTeacher])

  return (
    <div className="flex p-4  lg:items-center justify-center lg:h-full bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-[1200px] h-fit lg:h-[550px] bg-white rounded-lg shadow-sm shadow-gray-500/50 overflow-hidden">
        <div className="flex flex-col justify-between shrink-0 w-full lg:w-[350px] gap-3 h-full p-4 border border-l-[2px] border-l-slate-300">
          <p className="text-center text-slate-800 text-lg font-bold">خوش آمدید</p>
          <div className="flex flex-col justify-betweenw-full p-4 form-container">
            <span className="text-slate-800 text-md">لطفا موارد زیر را انتخاب کنید </span>
            <div className="row">
              <div className="column">
                <SelectBox name="college" options={optInfos.optCollege} selected={optInfos.college} onChange={(e) => handleOptInfos(e, "major")} disabled={turnTeacher} />
              </div>
            </div>

            {optInfos.college && (
              <div className="row">
                <div className="column">
                  <SelectBox name="major" options={optInfos.optMajor} selected={optInfos.major} onChange={(e) => handleOptInfos(e, "section")} disabled={turnTeacher} />
                </div>
              </div>
            )}

            {optInfos.major && (
              <div className="row">
                <div className="column">
                  <SelectBox name="section" options={optInfos.optSection} selected={optInfos.section} onChange={handleOptInfos} disabled={turnTeacher} />
                </div>
              </div>
            )}

            <button className='btn btn-md h-55 bg-primary border-none text-white text-base' disabled={(!optInfos.section || loading || turnTeacher ? true : false)} onClick={getTurnTeacher}> 
                {loading ? <span className='loading loading-dot'></span> : "جستجو"}
            </button>
            {turnTeacher && <p className='cursor-pointer m-0 p-0 text-center text-secondary font-bold' onClick={reset}>انتخاب ازنو</p>}
          </div>

          <Link href={`http://localhost:3000/studentturn/historyturns/${userId}`} className="text-center text-primary font-bold">تاریخچه نوبت ها</Link>
        </div>
        
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row w-full h-full lg:h-[500px] lg:h-full p-4 relative">
          <div className='flex flex-col w-full lg:pl-4 gap-4 shrink-0 lg:shrink h-[400px] lg:h-auto'>
            <div className='flex justify-between w-full items-center h-10 shrink-0'>
              <div className='flex items-center gap-2'>
                <button className="btn btn-outline btn-sm" onClick={() => createDaysOfTheMonth(turnTeacher, 'prev')}>
                  <ArrowLongRightIcon className='w-6 h-6' />
                  ماه قبلی
                </button>

                <button className="btn btn-outline btn-sm" onClick={() => createDaysOfTheMonth(turnTeacher, 'next')}>
                  ماه بعدی
                  <ArrowLongLeftIcon className='w-6 h-6' />
                </button>
              </div>
              <div className=''>{showMonth}</div>
            </div>
            <div className='bg-gray-100 w-full h-14 rounded-2xl p-2'>
              <div className='hidden md:flex bg-white h-full w-full rounded-lg justify-between py-1'>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>شنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>یک شنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>دوشنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>سه شنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>چهارشنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>پنج شنبه</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>جمعه</div>
              </div>

              <div className='flex bg-white h-full w-full rounded-lg justify-between py-1 md:hidden'>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>ش</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>ی</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>د</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>س</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>چ</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>پ</div>
                <div className='bg-gray-100 w-[1px] h-full'></div>
                <div className='w-[14%] shrink-0 flex items-center justify-center'>ج</div>
              </div>

            </div>
            <div className='bg-gray-100 flex flex-wrap justify-between rounded-2xl h-full'>
              {calendar.map((span) => 
                <>
                  <div className='calendar-weeks w-[14%] shrink-0 flex items-center justify-center'>
                    {span}
                  </div>
                </>
              )}
            </div>
          </div>
          {times.length ?  
            <>
              <div className='turn-hours flex flex-col items-center justify-between bg-gray-100 lg:shrink-0 gap-3 w-full lg:w-[170px] p-4 rounded-lg'>
                <div className='flex flex-col items-center gap-4 overflow-y-auto w-full h-full'>
                  {times.map((time, index) => 
                      <button key={index} className={`turn-hours-btns ${time === selectedTime && 'selected-time'}`} onClick={() => selectingTime(time)}>{time}</button> 
                  )}
                </div>
                <button className='btn w-full bg-primary border-none text-white text-md p-0' disabled={loadingSendData} onClick={sendData}>
                  {loadingSendData ? <span className='loading loading-dot'></span> : "ثبت نوبت"}
                </button>
              </div>
            </> : ""
          }
          {!turnTeacher && 
            <>
              <div className='absolute w-full h-full bg-white/90 flex items-center justify-center'>
                <p className='text-primary font-bold text-2xl'>ابتدا مقطع مورد نظر خود را انتخاب کنید.</p>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default AddTurnStudent
