import React, { useState, useEffect } from 'react';
import  { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import api from '../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../pages/calendar.styles.scss'
import 'moment/locale/pt-br'
import swal from 'sweetalert';

const localizer = momentLocalizer(moment)

function Calendario () {

        const [events, setEvents] = useState([]);
        const [user, setUser] = useState('Rodrigo');
        const [messages, SetMessages] = useState({
            today: 'Hoje',
            previous: '<',
            next: '>',
            month: 'Mês',
            day: 'Dia',
            week: 'Semana'
        })

        useEffect(() => {
            async function loadEvents(){
                const response = await api.get('/');

                setEvents(response.data)
            }

            loadEvents();
        }, [events]);

        return(
        <>
        <div className="calendar-container">
        <Calendar
        localizer={localizer}
        events={events}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={(e)=> {
            if (e.end.getDay() === 0){
                swal('Dia informado é DOMINGO!', 'Não foi executada a marcação, o dia informado é um domingo!' , "error")
            }
            else if(e.end.getDay() === 6){
                swal('Dia informado é SÁBADO!', 'Não foi executada a marcação, o dia informado é um sábado!' , "error")
            }
            else{
                api.post('/events', {
                    start: e.start,
                    end: e.start,
                    title: user,
                    allDay: true
            })
                .then(swal(`Dia marcado, ${user}!`, `O dia foi marcado para ${user}. Caso não seja você, clique uma vez em cima do nome e delete.`, "success"));
            }    
    }}
        popup={true}
        culture="pt-br"
        onSelectEvent={(e) => {
            api.delete(`/events/delete/${e._id}`)
            .then(swal(`Dia excluído, ${user}!`, `Este dia foi excluído de ${user}. Caso não seja você, por favor marque de novo no mesmo dia!`, "success"));
        }}
    />
      </div>
      <div className='auditor'>
          <h1>Auditor:</h1>
      </div>
      <div className='select-div'>
        <select className='select-auditor' value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="Rodrigo">Rodrigo</option>
            <option value="Luciano">Luciano</option> 
            <option value="Rafael">Rafael</option> 
            <option value="Franklin">Franklin</option> 
            <option value="Marcelo">Marcelo</option> 
            <option value="Israel">Israel</option> 
            <option value="Paulo">Paulo</option> 
            <option value="Anderson">Anderson</option>
            <option value="João">João</option> 
        </select>
      </div>


    </>
        )
    }

export default Calendario;
