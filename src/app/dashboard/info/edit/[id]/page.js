'use client'

import Input from '@/components/input'
import SelectBox from '@/components/selectbox'
import useInfo from '@/hooks/useInfo'
import useGetInfo from '@/hooks/useGetInfos'
import React, { useEffect, useState } from 'react'

const EditeInfo = ({params}) => {
    const {getInfos} = useGetInfo();
    const {loading, editInfo} = useInfo();
    const [formData, setFormData] = useState({
        title: "",
        type: "college",
        code: "",
        infoId: ""
    });

    const [infos, setInfos] = useState(null);
    const [colleges, setColleges] = useState([{
        value: "",
        title: "انتخاب کنید",
        optGroup: null
    }]);
    const [sections, setSections] = useState([{
        value: "",
        title: "انتخاب کنید",
        optGroup: null
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = editInfo({...formData, id: params.id});
        if(result) {
            setFormData({
                title: "",
                type: "college",
                code: "",
                infoId: ""
            });
            setInfos(null);
            setColleges([{
                value: "",
                title: "انتخاب کنید",
                optGroup: null
            }]);
            setSections([{
                value: "",
                title: "انتخاب کنید",
                optGroup: null
            }]);
        }
        getData();
    }

    const handleChange = (e) => {
        setFormData((data) => ({...data, [e.target.name]: e.target.value}));
    }

    // لیست دانشکدههای موجود رو میاره
    const getData = async () => {
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

            setSections([...sections, ...serverData.map((info) => {
                const newSection = info.infosId.map((sec) => ({
                    value: sec._id,
                    title: sec.title
                }));

                if(info.type === "college") return {value: "", title: info.title, optGroup: newSection};
            })]);
        }

        // api for get teacher's info
        const API_URL = `http://localhost:3000/api/infos/${params.id}`;
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

        // add new info
        const newInfo = {
            title: data.data.title,
            type: data.data.type,
            code: data.data.code,
            infoId: data.data.infoId
        }
        setFormData(newInfo);
    }

    useEffect(() => {
        if(!infos) getData();
    })

  return (
    <form onSubmit={handleSubmit} className='flex flex-col md:gap-3'>
        <div className='form-container'>
            <div className='row'>
                <div className='column'>
                    <span className='title-input'>عنوان</span>
                    <Input name='title' type='text' placeholder='دانشکده / مقطع / رشته' value={formData.title} onChange={handleChange} />
                </div>
                <div className='column'>
                    <span className='title-input'>کد دانشکده / مقطع / رشته</span>
                    <Input name='code' type='number' placeholder='کد دانشکده / مقطع / رشته' value={formData.code} onChange={handleChange} />
                </div>
            </div>

            <div className='row'>
                <div className='column'>
                    <span className='title-input'>گزینه موردنظر را انتخاب کنید</span>
                    <SelectBox name='type' options={[{value: 'college', title: 'دانشکده'}, {value: 'major', title: 'رشته'}, {value: 'section', title: 'مقطع'}]} selected={formData.type} onChange={handleChange} />
                </div>

                <div className={`column ${formData.type !== 'college' && 'hidden' }`}></div>

                <div className={`column ${formData.type !== 'major' && 'hidden' }`}>
                    <span className='title-input'>دانشکده</span>
                    <SelectBox name='infoId' options={colleges} selected={formData.infoId} onChange={handleChange} />
                </div>
                
                <div className={`column ${formData.type !== 'section' && 'hidden' }`}>
                    <span className='title-input'>رشته</span>
                    <SelectBox name='infoId' options={sections} selected={formData.infoId} onChange={handleChange} />
                </div>
            </div>
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

export default EditeInfo
