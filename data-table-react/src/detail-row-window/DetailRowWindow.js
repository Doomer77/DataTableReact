import React from 'react';

import './DetailRowWindow.css';

const DetailRowWindow = ({person}) => {
    return (
        <div className='person-window'>
            <p className='person-description'>Выбран пользователь: <b>{`${person.firstName} ${person.lastName}`}</b></p>
            <p className='person-description'>Описание:</p> 
            <textarea defaultValue={person.description} className='person-about'></textarea>
            <p className='person-description'>Адрес проживания: <b>{person.address.streetAddress}</b></p>
            <p className='person-description'>Город: <b>{person.address.city}</b></p>
            <p className='person-description'>Провинция/штат: <b>{person.address.state}</b></p>
            <p className='person-description'>Индекс: <b>{person.address.zip}</b></p>
        </div>
    )
}

export default DetailRowWindow;