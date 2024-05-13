'use client'

import SelectBox from '@/components/selectbox'
import React from 'react'

const SearchForm = () => {
  return (
    <form className='flex flex-col md:gap-3'>
        <div className='form-container'>
            <div className='row'>
                <div className='column'>
                    <span className='title-input'>نوع</span>
                        <SelectBox name='infoId' options={[{value: '', title: 'انتخاب کنید'}, {value: 'college', title: 'دانشکده'}, {value: 'section', title: 'مقطع'}, {value: 'major', title: 'رشته'}]} />
                </div>

                <div className='column'>
                    <span className='title-input'>دانشکده</span>
                        <SelectBox name='infoId' options={[]} />
                </div>
            </div>

            <div className='row'>
                <div className='column'>
                    <span className='title-input'>مقطع</span>
                        <SelectBox name='infoId' options={[]} />
                </div>

                <div className='column'></div>
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
                <button className='btn btn-md h-55 bg-primary border-none text-white text-base'>جستجو</button>
            </div>
        </div>
    </form>
  )
}

export default SearchForm
