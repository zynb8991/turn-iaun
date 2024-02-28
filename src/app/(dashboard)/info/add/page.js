'use client'

import Input from '@/components/input'
import SelectBox from '@/components/selectbox'
import useGetInfo from '@/hooks/useGetInfos'
import React, { useEffect, useState } from 'react'

const AddInfo = () => {
    const [formData, setFormData] = useState({
        title: "",
        type: "college",
        code: "",
        infoId: ""
    });

    const [infos, setInfos] = useState(null);
    const [colleges, setColleges] = useState([["", "انتخاب کنید"]]);
    const [sections, setSections] = useState([["", "انتخاب "]]);

    const {loading, getInfos} = useGetInfo();
    const handleSubmit = (e) => {
        e.preventDefault();
      }

    const handleChange = (e) => {
        setFormData((data) => ({...data, [e.target.name]: e.target.value}));
    }

    const getData = async () => {
        const serverData = await getInfos();
        let newcolleges = [];
        if(serverData) {
            setInfos(serverData);
            setColleges([...colleges, ...serverData.map((info) => [info._id, info.title])]);

            const test = serverData.map((info) => {
                const newSection = info.infosId.map((sec) => [sec._id, sec.title]);
                if(info.type === "college") return {title: info.title, sections: newSection};
            })
            console.log(test);
            // setSections([...sections, ...serverData.map((info) => {
            //     const newSection = info.infosId.map((sec) => [sec._id, sec.title]);
            //     if(info.type === "college") return {title: info.title, sections: newSection};
            // })]);
        }
    }

    useEffect(() => {
        if(!infos) getData();
    })

  return (
    <form onSubmit={handleSubmit} className=''>
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
                    <SelectBox name='type' options={[['college', 'دانشکده'], ['section', 'مقطع'], ['major', 'رشته']]} selected={formData.type} onChange={handleChange} />
                </div>

                <div className={`column ${formData.type !== 'college' && 'hidden' }`}></div>

                <div className={`column ${formData.type !== 'section' && 'hidden' }`}>
                    <span className='title-input'>دانشکده</span>
                    <SelectBox name='infoId' options={colleges} onChange={handleChange} />
                </div>
                
                <div className={`column ${formData.type !== 'major' && 'hidden' }`}>
                    <span className='title-input'>مقطع</span>
                    <SelectBox name='infoId' options={sections} onChange={handleChange} />
                </div>
            </div>

            <div className='row'>
                <div className='column'>
                    <button className='btn btn-md h-55 bg-primary border-none text-white text-base' disabled={loading}>
                        {loading ? <span className='loading loading-dots'></span> : "افزودن"}
                    </button>
                </div>
                <div className='column'></div>
            </div>
        </div>
    </form>
  )
}

export default AddInfo