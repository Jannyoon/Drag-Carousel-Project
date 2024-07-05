import React from 'react';
import ham1 from '../component/img/cute-3160464_1280.jpg';
import Item from './Item.jsx';
import { useState, useRef } from 'react';

export default function ItemGallery() {
  const scrollRef = useRef();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const imageList = [ham1, ham1, ham1, ham1, ham1];
  if (scrollRef.current){
    console.log("--------------------")
    console.log("scrollLeft:", scrollRef.current.scrollLeft);
    console.log("scrollWidth:",scrollRef.current.scrollWidth);
    console.log("clientWidth", scrollRef.current.clientWidth);    
    console.log("현재 시작 지점:", startX)
    console.log("--------------------")
  }

  //console.log("사이즈를 출력해봐..", size); 
  /*bottom, height ,left, right ,top,width,x*/
  const onDragStart = e => {
    e.preventDefault();
    e.stopPropagation();

    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };
  //맨 처음시작할 때 마우스로 클릭한 지점인 e.pageX에 0을 더한 값이
  //저장된다.

  const onDragEnd = () => { setIsDrag(false); }
  const onDragMove = (e) =>{
    if (isDrag){
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX; //차만큼 이동하게 된다.
      console.log("지금 scrollLeft", scrollRef.current.scrollLeft);

      //이동 후 스타트 위치를 갱신해줌.
      if (scrollLeft ===0) {
        setStartX(e.pageX);
      }
      else if (scrollWidth <= (clientWidth + scrollLeft)) {
        setStartX(e.pageX + scrollLeft); //e.pageX + scrollLeft //e.pageX로 하면, 끝에 달했을 떄 다시 0으로 돌아감
        console.log(e.pageX, scrollLeft, e.pageX+scrollLeft);
      }
    }
  }


  //쓰로틀 구현
  const throttle = (func, ms) =>{
    let throttled = false;
    return (...args) => {
      if (!throttled){
        throttled = true;
        setTimeout(()=>{
          func(...args);
          throttled = false;
        }, ms)
      }
    }
  }

  const delay = 50;
  const onThrottleDragMove = throttle(onDragMove, delay); 

  return (
    <div className='w-9/12 p-4 bg-sky-600'> {/* container */}
      <div className='flex overflow-x-scroll' ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >{/* 움직일 뷰어 */}
        {imageList.map((v,i) => (<Item key={i} src={v} idx={i}/>) )}
  
      </div>    
    </div>
  );
}

