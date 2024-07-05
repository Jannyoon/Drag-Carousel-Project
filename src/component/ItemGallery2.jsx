import React, { useEffect, useRef, useState } from 'react';
import Item from './Item';

export default function ItemGallery2() {
  const itemList = [
    `https://cdn.pixabay.com/photo/2023/05/14/17/46/ducklings-7993465_960_720.jpg`,
    'https://cdn.pixabay.com/photo/2019/12/12/22/46/animal-4691724_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794_1280.jpg'
  ];
  const containerRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  //w-44는 /* 176px */

  useEffect(()=>{
    console.log("현재 index", currentIndex);
  },[currentIndex]);

  const onDragStart = (e)=>{
    e.preventDefault(); //다른 프로젝트에선 페이지로 이동할 것을 가정하고 preventDefault() 코드 추가함
    e.stopPropagation();

    setIsDrag(true);
    setStartX(e.pageX);
  }

  const onDragEnd = (e)=>{  
    if (isDrag){
      console.log("마지막이었던 위치", e.pageX);
      setIsDrag(false);    

      const delta = startX - e.pageX;
      console.log("차를 나타내겠다", delta)
      if (delta<0){
        currentIndex==0 ? setCurrentIndex(2) : setCurrentIndex(currentIndex-1);
      }
      else if (delta===0) return; //코드 수정 시 해당 위치로 이동하게 할 수도...
      else if (delta>0){
        currentIndex==2 ?
        setCurrentIndex(0) :
        setCurrentIndex(currentIndex+1);
      }
    }
  }

  const onDragMove = (e)=>{
    if (isDrag){
      const target = e.target;

      console.log("e.pageX", e.pageX);
      console.log(startX)
    }
  }

  const delay = 50;
  const throttle = (func, ms)=>{
    let throttled = false;
    return (...args)=>{
      if (!throttled){
        throttled = true;
        setTimeout(()=>{
        func(...args);
        throttled = false; }, ms)     
      }
    }
  }
  const onThrottleDragMove = throttle(onDragMove, delay);
  const SLIDERWIDTH = 224;
  return (
    <div className='mt-3 w-56 flex items-center'> {/*전체 컨테이너 */}
      <div className='w-full overflow-hidden'>{/*액자*/}
        <div 
          ref={containerRef}
          className='w-full flex items-center'
          onMouseDown = {onDragStart}
          onMouseMove = {isDrag ? onThrottleDragMove : null}
          onMouseUp = {onDragEnd}
          onMouseLeave = {onDragEnd}
          style={{
            transform : `translateX(-${currentIndex* SLIDERWIDTH}px)`,
            transition : 'transform 300ms ease-in-out'
          }}

        >
          {itemList.map((v,i)=>(
            <Item key={i} src={v} idx={i}/>
          ))}

        </div>
      </div>{/*액자*/}


    </div>
  );
}

