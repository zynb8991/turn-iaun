'use client'

import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // تابعی که هر ثانیه زمان را به روز می‌کند
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // تمیزکاری برای جلوگیری از حافظه پر شدن
    return () => clearInterval(interval);
  }, []);

  // تبدیل زمان به وقت محلی با فرمت 24 ساعته
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const localTime = time.toLocaleTimeString('en', options);

  return (
    <div className='text-[40px] stroke'>
      {localTime}
    </div>
  );
}

export default Clock;
