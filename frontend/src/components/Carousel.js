import React from "react";

export function Carousel(props) {
  
    var hover = false;

    setInterval(() => {
        var elem = document.getElementById('car');
        var carItems = (document.querySelectorAll('#car .car-item').length > 2) ? document.querySelectorAll('#car .car-item').length : 10;
        if(elem) {
            if(!hover) {
                console.log(elem.scrollWidth)
                console.log(elem.scrollLeft)
                if(elem.scrollLeft >= (elem.scrollWidth / carItems) ) {
                    elem.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    })
                }
                else {
                    elem.scrollBy({
                        left: (elem.scrollWidth / 6),
                        behavior: 'smooth'
                    });
                }
            }   
        }
    }, 3000);
  
      return (
        <div onMouseOver={() => {hover = true}} onMouseLeave={() => {hover = false}} id='car' style={{width: '100%', height: '30rem', display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory'}}>
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }}></div>
            {props.items.map((step, index) => (
                <div key={index} className='car-item' 
                style={{ 
                    backgroundColor: '#eeeeee', 
                    minWidth: '45%', 
                    scrollSnapAlign: 'center',
                    borderRadius: 10,
                    marginRight: 8,
                    marginLeft: 8
                    }}>
                    {step.name}
                </div>
            ))}
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }}></div>
        </div>
      );
  }