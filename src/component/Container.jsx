import React from 'react';
import ham1 from '../component/img/cute-3160464_1280.jpg'
import ItemGallery from './ItemGallery';

export default function Container() {
  const srcImg = [];
  return (
    <div className='w-5/6 h-32 md:h-36 lg:h-48 bg-slate-500 flex items-center justify-around'>      
      <ItemGallery/>
    </div>
  );
}

