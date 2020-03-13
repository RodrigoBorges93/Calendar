import React, { useState, useEffect, useContext } from 'react';
import  { Calendar, momentLocalizer } from 'react-big-calendar';
import { LoginContext } from '../contexts/login.context';
import { AreaContext } from '../contexts/area.context';
import LoginPage from '../pages/login/login';
import moment from 'moment';
import api from '../services/api';
import '../pages/calendar.styles.scss'
import 'moment/locale/pt-br'
import { confirmAlert } from 'react-confirm-alert';
import swal from 'sweetalert';


const localizer = momentLocalizer(moment)

function Calendario () {
        const [events, setEvents] = useState([]);
        const [area, setArea] = useContext(AreaContext);
        const [user, setUser] = useState(
            // ['Anderson','Franklin','Israel','João','Luciano', 'Marcelo','Paulo','Rafael','Rodrigo']

            [
            {nome:'Anderson', area:'serv'}, {nome:'Franklin', area:'serv'}, {nome:'Israel', area:'serv'}, {nome:'João', area:'serv'}, {nome:'Luciano', area:'serv'}, {nome:'Marcelo', area:'serv'}, {nome:'Paulo', area:'serv'}, {nome:'Rafael', area:'serv'}, {nome:'Rodrigo', area:'serv'},
            {nome:'Antonio', area:'pic'}, {nome:'Amanda', area:'pic'}, {nome:'Ronaldo', area:'pic'}, {nome:'Gustavo', area:'pic'}, {nome:'Erick', area:'pic'},
            {nome:'Daniele', area:'neg'}, {nome:'Bruno', area:'neg'}, {nome:'Carlile', area:'neg'}, {nome:'Maicon', area:'neg'}, {nome:'João Paulo', area:'neg'}, {nome:'Mirson', area:'neg'}, {nome:'Alexandre', area:'neg'}, {nome:'Jacqueline', area:'neg'}, {nome:'Svenson', area:'neg'}, {nome:'Luciana', area:'neg'}, {nome:'Rodrigo', area:'neg'}, {nome:'Fernando', area:'neg'},
            {nome:'Renata Cabral', area:'corp'}, {nome:'Renata Noronha', area:'corp'}, {nome:'Ricardo', area:'corp'}, {nome:'Marco', area:'corp'}, {nome:'Penellope', area:'corp'}, {nome:'Louise', area:'corp'}, {nome:'Henrique', area:'corp'}, {nome:'Pedro', area:'corp'}, {nome:'Elizeu', area:'corp'}, {nome:'Cristina', area:'corp'}, {nome:'Itamar', area:'corp'}
            ]
        )
        const [messages, SetMessages] = useState({
            today: 'Hoje',
            previous: '<',
            next: '>',
            month: 'Mês',
            day: 'Dia',
            week: 'Semana'
        })
        const[logged, setLogged] = useContext(LoginContext);


        useEffect(() => {
            async function loadEvents(){
                const response = await api.get(`/${area}`);

                setEvents(response.data)
            }

            loadEvents();
        }, [events]);


        return(
        
        <>

        {
        logged ?
        <div className="calendar-container">
        <Calendar
        localizer={localizer}
        defaultView = "work_week"
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
        views={['work_week']}
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
    //     onSelectSlot={(e) => {
    //             user.forEach((usuario) => {
    //                 api.post('/events', {
    //                 start: e.start,
    //                 end: e.start,
    //                 title: usuario.nome,
    //                 allDay: true,
    //                 isGoing: true,
    //                 area: usuario.area,

    //          })
    //             })
    //     }
    // }
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
      :
      <LoginPage/>
    
    }
    </>
        )
    }

export default Calendario;
