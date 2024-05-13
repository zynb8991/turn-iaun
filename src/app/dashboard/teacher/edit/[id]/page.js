'use client'

import Input from '@/components/input'
import SelectBox from '@/components/selectbox'
import useTeacher from '@/hooks/useTeacher'
import React, { useEffect, useState } from 'react'
import {PlusCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'
import useGetInfos from '@/hooks/useGetInfos'

const EditTeacher = ({params}) => {
    
    const {getInfos} = useGetInfos();
    const {loading, editTeacher} = useTeacher();
    const [formData, setFormData] = useState({
        fullName: "", 
        email: "", 
        role: "teacher", 
        personnelCode: "", 
        password: ""
    });

    // برای فیلدهای دانشکده و مقطع و رشته
    const [teacherSection, setTeacherSection] = useState([
        {college: '', major: '', section: '', majorOptions: [{
            value: "",
            title: " رشته را انتخاب کنید",
            optGroup: null
        }], sectionOptions: [{
            value: "",
            title: " مقطع را انتخاب کنید",
            optGroup: null
        }]}
    ]);

    const [infos, setInfos] = useState(null);
    const [colleges, setColleges] = useState([{
        value: "",
        title: "دانشکده را انتخاب کنید",
        optGroup: null
    }]);

    // برای اافزودن و ذخیره اطلاعات مدیرگروه
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {...formData, sections: teacherSection, teacherId: params.id};
        await editTeacher(newData);
    }

    // برای تغییر فیلدهای فرم
    const handleChange = (e) => {
        setFormData((data) => ({...data, [e.target.name]: e.target.value}));
    }

    // تغییر سلکت باکس ها، مقادیر رار بگیرد بریزد داخل متغیر و ...
    const handleChangeSection = (index, e) => {
        const oldData = teacherSection[index];
        let newData = {...oldData, [e.target.name]: e.target.value};

        // لیست رشته های دانشکده انتخابی
        if(e.target.name === "college") {

            // فیلتر میزنه ببینه این دانشکده توی دانشکده ها هست یا نه
            const opts = infos.filter((opt) => e.target.value === opt._id);
            newData = {...newData, majorOptions: [{
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
            ))], sectionOptions: [{
                value: "",
                title: " مقطع را انتخاب کنید",
                optGroup: null
            }]};
        }

        // مقاطع رشته انتخابی
        if(e.target.name === "major") {

            // ببینیم اون رشته بین رشته ها هست یا نه
            const majorOfCollege = infos.filter((opt) => oldData.college === opt._id);

            // برای اینکه به فرزندانش دست پیدا کنیم تا بتونیم مقاطع رو بیاوریم
            const opts = majorOfCollege[0].infosId.filter((opt) => e.target.value === opt._id);

            newData = {...newData, sectionOptions: [{
                value: "",
                title: " مقطع را انتخاب کنید",
                optGroup: null
            },
            // برای دستیابی به فرزندانش
            ...opts[0]?.infosId.map((opt) => (
                {
                    value: opt._id,
                    title: opt.title,
                    optGroup: null
                }
            ))]};
        }

        // اطلاعات رو ست میکنیم
        setTeacherSection((prevData) => prevData.map((teachereSec, mapIndex) => mapIndex == index ? newData : teachereSec));
    }

    const getData = async () => {

        // api for get teacher's info
        const API_URL = `http://localhost:3000/api/users/${params.id}`;
        const res = await fetch(API_URL, {
            method: 'GET',
            cache: 'no-store'
        });

        if(!res.ok) {
            toast.error('خطای سرور رخ داده است.');
          }else {
            
            // اطلاعات را بصورت جیسون به سمت ما بفرستد
            const data = await res.json();
            if(data.error) {
              toast.error(data.message);
            }else {
              toast.success('اطلاعات با موفقیت دریافت شد.');
            }
          }

        // ایجاد دیتای جدید با اطلاعاتی که گرفتیم
        const newTeacherData = {
            fullName: data.data.fullName, 
            email: data.data.email, 
            role: "teacher", 
            personnelCode: data.data.personnelCode, 
            password: ""
        }
        setFormData(newTeacherData);

        // get info for college and section and major
        const serverData = await getInfos();
        if(serverData) {
            setInfos(serverData);
            setColleges([...colleges, ...serverData.map((info) => (
                {
                    value: info._id,
                    title: info.title,
                    optGroup: null
                }
            ))]);
        }

        // 
        let sectionsId = [];
        data.data.sectionsId.map((sec) => {
            let secId = {
                college: sec.infoId.infoId.infoId._id,
                major: sec.infoId.infoId._id,
                section: sec.infoId._id
            }

            // فیلتر میزنه ببینه این دانشکده توی دانشکده ها هست یا نه
            const opts = serverData.filter((opt) => sec.infoId.infoId.infoId._id === opt._id);
            
            // برای اینکه به فرزندانش دست پیدا کنیم تا بتونیم مقاطع رو بیاوریم
            const optsSection = opts[0].infosId.filter((opt) => sec.infoId.infoId._id === opt._id);
            secId = {...secId, majorOptions: [{
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
            ))], sectionOptions: [{
                value: "",
                title: " مقطع را انتخاب کنید",
                optGroup: null
            },
            // برای دستیابی به فرزندانش
            ...optsSection[0]?.infosId.map((opt) => (
                {
                    value: opt._id,
                    title: opt.title,
                    optGroup: null
                }
            ))]};

            sectionsId.push(secId);
        })
        setTeacherSection(sectionsId);
    }

     // برای افزودن مقطع جدید یعنی ایجاد یک سطر وقتی روی بعلاوه میزنم
    const addNewRowSection = () => {
        setTeacherSection((oldRow) => [...oldRow, {college: '', section: '', majorOptions:[{
            value: "",
            title: "رشته را انتخاب کنید",
            optGroup: null
        }], sectionOptions: [{
            value: "",
            title: " مقطع را انتخاب کنید",
            optGroup: null
        }]}]);
    }

    // حذف سطر برای ایجاد مقطع جدید برای هر مدیرگروه
    const removeRowSection = (id) => {
        teacherSection.map((sec, index) => {
        })
        setTeacherSection((prevData) => prevData.filter((sec, index) => index != id));
    }

    useEffect(() => {
        if(!infos) getData();
    })

  return (
    <form onSubmit={handleSubmit} className='flex flex-col md:gap-3'>
        <div className='form-container'>
            <div className='row'>
                <div className='column'>
                    <span className='title-input'>نام</span>
                    <Input name='fullName' type='text' placeholder='نام و نام خانوادگی' value={formData.fullName} onChange={handleChange} />
                </div>
                <div className='column'>
                    <span className='title-input'>ایمیل</span>
                    <Input name='email' type='text' placeholder='ایمیل' value={formData.email} onChange={handleChange} />
                </div>
            </div>

            <div className='row'>
                <div className='column'>
                    <span className='title-input'>شماره پرسنلی</span>
                    <Input name='personnelCode' type='text' placeholder='شماره پرسنلی' value={formData.personnelCode} onChange={handleChange} />
                </div>
                <div className='column'>
                    <span className='title-input'>رمز ورود</span>
                    <Input name='password' type='password' placeholder='رمز ورود' value={formData.password} onChange={handleChange} />
                </div>
            </div>   
            {teacherSection.map((row, index) => (
                <>
                    <div className='row'>
                        <div className='column'> 
                            <span className='title-input'>مقطع {(index + 1)}</span>
                            <SelectBox name='college' options={colleges} selected={row.college} onChange={(e) => handleChangeSection(index, e)} />
                        </div>

                        <div className='column'>
                            <span className='title-input'>&nbsp;</span>
                            <SelectBox name='major' options={row.majorOptions} selected={row.major} onChange={(e) => handleChangeSection(index, e)} />
                        </div>

                        <div className="column">
                            <span className='title-input'>&nbsp;</span>
                            <SelectBox name='section' options={row.sectionOptions} selected={row.section} onChange={(e) => handleChangeSection(index, e)} />
                        </div>

                        <div className='flex items-center'>
                            <span className='title-input'>&nbsp;</span>
                            {index === (teacherSection.length - 1) ? (
                                <button type='button' id={index} className='flex items-center justify-center w-8 top-[15px] relative' onClick={addNewRowSection}>
                                    <PlusCircleIcon className='w-8 text-green-600' />
                                </button> 
                            ) : (
                                <button type='button' id={index} className='flex items-center justify-center w-8 top-[15px] relative' onClick={() => removeRowSection(index)}>
                                    <XCircleIcon className='w-8 text-rose-600' />
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ))}
            
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
                    {loading ? <span className='loading loading-dots'></span> : "ویرایش"}
                </button>
            </div>
        </div>
    </form>
  )
}

export default EditTeacher