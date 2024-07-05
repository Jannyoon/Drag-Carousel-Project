import React from 'react';
import ham1 from '../component/img/cute-3160464_1280.jpg'
export default function Item({src, idx, onClick}) {
  return (
    <div className='flex flex-shrink-0 w-44 p-1 bg-black'
    onClick={onClick}>
      <img draggable={false} src={src} className='w-20 h-20 md:w-24 lg:w-32 md:h-24 lg:h-32'/>
      <div draggable={false} className='w-24 h-20 md:w-44 lg:w-80 md:h-24 lg:h-32 bg-white overflow-auto'>
        <h1>큰 설명</h1>
        <p className='text-sm'>구체적인 설명 구체적인 설명 구체적인 설명 구체적인 설명</p>
      </div>
    </div>
  );
}

