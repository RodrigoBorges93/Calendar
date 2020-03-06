import React, { useState, useEffect } from 'react';
import  { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import api from '../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../pages/calendar.styles.scss'
import 'moment/locale/pt-br'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import swal from 'sweetalert';


const localizer = momentLocalizer(moment)

function Calendario () {
        const [events, setEvents] = useState([]);
        const [user, setUser] = useState(['Rodrigo, Luciano, Rafael, Franklin, Marcelo, Israel, Paulo, Anderson, João']);
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
        eventPropGetter={
            (event, start, end, isSelected) => {
            let newStyle = {
                backgroundColor: "lightgrey",
                color: 'black',
                borderRadius: "0px",
                border: "none"
            };

            if (event.isGoing){
                newStyle.backgroundColor = "lightgreen"
            }

            return {
                className: "",
                style: newStyle
            };
            }
        }
        events={events}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        views={['month', 'week', 'day']}
        // onSelectSlot={(e)=> {

        //     if (e.end.getDay() === 0){
        //         swal('Dia informado é DOMINGO!', 'Não foi executada a marcação, o dia informado é um domingo!' , "error")
        //     }
        //     else if(e.end.getDay() === 6){
        //         swal('Dia informado é SÁBADO!', 'Não foi executada a marcação, o dia informado é um sábado!' , "error")
        //     }
        //     else{

        //         api.post('/events', {
        //             start: e.start,
        //             end: e.start,
        //             title: user,
        //             allDay: true,
        //             isGoing: true,

        //     })
        //         .then(swal(`Dia marcado, ${user}!`, `O dia foi marcado para ${user}. Caso não seja você, clique uma vez em cima do nome e delete.`, "success"));
        //     }    
        // }}
        popup={true}
        culture="pt-br"
        onSelectEvent={(e) => {
        confirmAlert({
            title: 'Tem certeza que deseja mudar o status?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => api.put(`/events/update/${e._id}`)
                },
                {
                label: 'Não',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            });
            // api.delete(`/events/delete/${e._id}`)
            // .then(swal(`Dia excluído, ${user}!`, `Este dia foi excluído de ${user}. Caso não seja você, por favor marque de novo no mesmo dia!`, "success"));
        }}
    />
    
      </div>
    </>
        )
    }

export default Calendario;
