import React from 'react'
import { } from 'firebase/firestore';
const CardMessage = ({ id, message, currentId }) => {

    //фукнция для перевода из Date в красивый(с нулями вначале, где надо) вид string
    const currentTime = () => {
        var time;
        if (message.createdAt !== null) {
            time = message.createdAt.toDate();
        }
        else time = new Date();
        const hour = time.getHours();
        let str_hour;
        if (hour < 10) {
            str_hour = `0${hour}`;
        }
        else str_hour = hour;

        const minute = time.getMinutes();
        let str_minute;
        if (minute < 10) {
            str_minute = `0${minute}`;
        }
        else str_minute = minute;
        return (`${str_hour}:${str_minute}`);

    }
    return (
        <div id={id} className='cardMessage'>
            <img src={message.photoUrl} alt='logo' />
            {message.text && <div className={`textArea ${message.uid === currentId ? 'me' : ''}`}>
                <div className='infoText'>
                    {!(message.uid === currentId) && <h3>{message.displayName}</h3>}
                    <p wrap='soft' className='textMessage'>{message.text}</p>
                </div>
                <p className='time'>
                    {currentTime()}
                </p>
            </div>}
            {message.img
                &&
                <img src={message.img} alt='img'></img>}
        </div>
    )
}

export default CardMessage