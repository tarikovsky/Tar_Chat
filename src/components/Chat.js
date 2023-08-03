import React, { useContext, useState } from 'react'
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loading from './Loading';
// import firebase from 'firebase/compat/app';
import CardMessage from './CardMessage';
import { collection, query, addDoc, Timestamp } from "firebase/firestore";
import { serverTimestamp, orderBy } from 'firebase/firestore';



export const Chat = () => {
    //массив с месяцами для красивого отображения
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    
    const { auth, db } = useContext(Context)
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');


    //забираем сообщения с помощью хука из Firebase
    const [messages, loading] = useCollectionData(
        query(collection(db, 'messages'), orderBy('createdAt'))
        )
    

    //отправка сообщений на Enter
    const sendMessageKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) sendMessage();
        resize();
    }

    //отправка сообщений
    const sendMessage = async () => {
        if (value.trim()) {
            var temp_value = value;
            setValue('');
            resize();
            await addDoc(collection(db, 'messages'), {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                text: temp_value,
                createdAt: serverTimestamp(),
            })
            scrollToBottom(messages.length);
        }
    }

    //отправка сообщений по button
    const set_value_without_enter = (e) => {
        if ((value === '') && e.target.value[e.target.value.length-1] === '\n');
        else {
            setValue(e.target.value);
        }
    }

    //функция сравнивает два сообщения, и если у них разные дни, то она возвращает jsx с этим днем 
    const checkNewDay = (previous_message, message, i) => {
        var firstDate = new Timestamp();
        if (previous_message) firstDate = previous_message.createdAt;
        var secondDate = message.createdAt;
        var firstTime;
        var secondTime;
        if (firstDate !== null) {
            firstTime = firstDate.toDate();
        }
        else firstTime = new Date();

        if (secondDate !== null) {
            secondTime = secondDate.toDate();
        }
        else secondTime = new Date();
        var isItnewDay = secondTime.getDate() !== firstTime.getDate();
        return <>
            {isItnewDay &&
                <div className='dateWrapper'>
                    <div className='date'>
                        {secondTime.getDate()} {months[secondTime.getMonth()]}
                    </div>
                </div>}
            {<CardMessage key={i} id={i} message={message} currentId={user.uid} length={messages.length} />}</>
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='chat_container'>
            <div className='chat_block'>
                <div className='top'>
                </div>
                <div className='chatWrapper'>
                    <div className='chat'>
                        {messages.map((message, i) => (
                            checkNewDay(messages[i - 1], message, i)
                        )
                        )}
                    </div>
                </div>
                <div className='send'>
                    <textarea id="text_area" onKeyDown={sendMessageKeyDown} value={value} onChange={e => set_value_without_enter(e)} rows={1} placeholder='Напишите сообщение' cols="5"></textarea>
                    <button id='send_enter' onClick={sendMessage} className='button_send'><img src='/img/send.svg' alt='send' /></button>
                </div>
            </div>
        </div>
    )


    //функция для скролла вниз сообщений при загрузке страницы и при отправке сообщений
    function scrollToBottom(id) {
        const lastCard = document.getElementById(id);
        if (lastCard)
            lastCard.scrollIntoView({ block: "end", behavior: "smooth" });
    }


    //функция для изменения масштаба поля input
    function resize() {
        const textarea = document.getElementById('text_area');
        setTimeout(() => {
            if (textarea.scrollHeight <= 140) {
                textarea.style.cssText = 'height:auto;';
                textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
            }
        }, 0
        )
    }

}
export default Chat;