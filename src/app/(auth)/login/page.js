'use client'

import Input from '@/components/input';
import React, {useEffect, useState} from 'react';
import {EnvelopeIcon, LockClosedIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';
import useLogin from '@/hooks/useLogin';

const Login = () => {
  const [isTeacher, setIsTeacher] = useState(true);
  const [changeForm, setChangeForm] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  })

  const {loading, login} = useLogin();
  
  const handleChangeTab = (tab) => {
    setIsTeacher(tab);
    setChangeForm(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dataForm);
  }

  useEffect(() => {
    if(changeForm) {
      setTimeout(() => {
        setChangeForm(false);
      }, 1000)
    }
  }, [changeForm, setChangeForm]);

  return (
    <div className="flex flex-col gap-8 items-center">
      <div role="tablist" className="tabs w-3/4 tabs-boxed tabs-lg bg-bg-gray">
        <a role="tab" className={`tab text-base ${isTeacher ? "bg-primary text-white" : "text-neutral-600"}`} onClick={() => handleChangeTab(true)}>ورود استاد</a>
        <a role="tab" className={`tab text-base ${!isTeacher ? "bg-primary text-white" : "text-neutral-600"}`} onClick={() => handleChangeTab(false)}>ورود دانشجو</a>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {!changeForm && (
          <>
            <Input 
              type="text" 
              name="email" 
              placeholder="ایمیل" 
              value={dataForm.email} 
              onChange={(e) => setDataForm({...dataForm, email: e.target.value})}
            >
              <EnvelopeIcon className='w-5 text-neutral-500' />
            </Input>

            <Input 
              type="password" 
              name="password" 
              placeholder="رمز عبور"
              value={dataForm.password} 
              onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
            >
              <LockClosedIcon className='w-5 text-neutral-500' />
            </Input>
            
            <button className="btn btn-md h-55 bg-primary border-none text-white text-lg" disabled={loading}>
              {loading ? <span className='loading loading-dots'></span> : "ورود"}
            </button>

            {!isTeacher && <div className='text-center'><Link href={'/register'} className='text-primary text-md font-bold'>ایجاد حساب کاربری</Link></div>}
          </>
        )}

        {changeForm && <div className="flex items-center justify-center h-20"><span className="loading loading-dots loading-lg"></span></div>}
      </form>
    </div>
  )
}

export default Login
