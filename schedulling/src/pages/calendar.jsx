import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import api from '../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../pages/calendar.styles.css'

const localizer = momentLocalizer(moment)

function Calendario () {

        const [events, setEvents] = useState([]);

        useEffect(() => {
            async function loadEvents(){
                const response = await api.get('/events');

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
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
    />
      </div>
      <div className='add-button'>
        <Link to='/adicionarevento' class='button-add'>+</Link> 
      </div>

    </>
        )
    }

export default Calendario;
