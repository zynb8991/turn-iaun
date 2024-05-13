'use client'

import Input from '@/components/input'
import SelectBox from '@/components/selectbox'
import useInfo from '@/hooks/useInfo'
import useGetInfo from '@/hooks/useGetInfos'
import React, { useEffect, useState } from 'react'

const AddInfo = () => {
    const {getInfos} = useGetInfo();
    const {loading, addInfo} = useInfo();
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
        const result = addInfo(formData);
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
                    <SelectBox name='infoId' options={colleges} onChange={handleChange} />
                </div>
                
                <div className={`column ${formData.type !== 'section' && 'hidden' }`}>
                    <span className='title-input'>رشته</span>
                    <SelectBox name='infoId' options={sections} onChange={handleChange} />
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
                    {loading ? <span className='loading loading-dots'></span> : "افزودن"}
                </button>
            </div>
        </div>
    </form>
  )
}

export default AddInfo