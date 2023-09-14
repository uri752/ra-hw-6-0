import React, { useEffect } from 'react'
import { useState } from 'react';

export default function WatchItem(props) {
    const {id, title, timeZone, removeWatch} = props;
    const [time, setTime] = useState('');
    let interval; 

    
    // 2 - взять стили из библиотеки bootstrap/ см у Минина
    // 3 - как рассчитать смещение по гринвичу, зачем была подсказка:
        // Подсказки:  Посмотреть текущий TimezoneOffset вы можете, используя объект Date.
        // Можете использовать библиотеку Moment.js.
    
    // 4 - решить задачу 2 - работа с запросами к серверу http-запросы ???

    // componentDidMount
    useEffect( () => {
        interval = setInterval( () => {            
            const newDate = new Date();        
            const curTimeZone = newDate.getTimezoneOffset();            
            const curOffset = curTimeZone + timeZone * 60; // min
            newDate.setMilliseconds(curOffset * 60 * 1000);                        
            setTime(newDate.toLocaleTimeString(), 1000)
        });
    },[]);

    // "демонтаж-умирание" очистика setTimout/setInterval
    // componentWillUnmount и его аналогия в функциональном компоненте
    useEffect( () => {
        return (
            () => {
                if (interval) {
                    clearInterval(interval);
                }
            }
        )
    },[]);

    return (
    <div className='watch-data'>
        <span>{title}</span>                
        <span>{time}</span>        
        <button 
            onClick={() => removeWatch(id)}            
        >x</button>
    </div>
  )
}
