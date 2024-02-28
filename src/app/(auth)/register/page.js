'use client'

import Input from '@/components/input';
import useRegister from '@/hooks/useRegister';
import { UserIcon, EnvelopeIcon, LockClosedIcon} from '@heroicons/react/24/outline'
import { useState } from 'react';

const Register = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    family: "",
    email: "",
    password: ""
  })

  const {loading, register} = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(dataForm);
  }

  return (

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <>
          <span className="text-neutral-800 text-center text-lg mb-4 font-bold">ثبت نام</span>

            <Input 
              type="text" 
              name="name" 
              placeholder="نام"
              value={dataForm.name} 
              onChange={(e) => setDataForm({...dataForm, name: e.target.value})}
            >
              <UserIcon className='w-5 text-neutral-500' />
            </Input>

            <Input 
              type="text" 
              name="family" 
              placeholder="نام خانوادگی"
              value={dataForm.family} 
              onChange={(e) => setDataForm({...dataForm, family: e.target.value})}
            >
              <UserIcon className='w-5 text-neutral-500' />
            </Input>

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
              <LockClosedIcon className='w-6 text-neutral-500' />
            </Input>

            <button className="btn btn-md h-55 bg-primary text-white text-lg border-none" disabled={false}>
              {loading ? <span className='loading loading-dots'></span> : "ثبت نام"}
            </button>
          </>
      </form>
    
  )
}

export default Register
