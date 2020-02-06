import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import api from '../../services/api';
import "react-datepicker/dist/react-datepicker.css";

const AddEvents = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState();

  async function adicionarEvento(){
      await api.post('/events', {
          start: startDate,
          end: startDate,
          title: user
      })

      setUser('');
      setStartDate(new Date())

  }

  return (
    <>
    <div>
        <input type='text' onChange={e => setUser(e.target.value)}/>
        <DatePicker className='datepicker' selected={startDate} onChange={date => setStartDate(date)} />
        <button onClick={()=> adicionarEvento()}> Enviar </button>
    </div>
    <div className='pagina-inicial'>
        <Link to='/'> Voltar ao calendário </Link>
    </div>
    </>
  );
}

export default AddEvents;