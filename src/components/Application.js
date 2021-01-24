import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList"

import Appointment from "./Appointment/index"

import {getAppointmentsForDay} from "../Helpers/selectors"



// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: interviewer
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "John Doe",
//       interviewer: interviewers[1]
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Deon Leer",
//       interviewer: interviewers[2]
//     }
//   },
//   {
//     id: "last",
//     time: "5pm"
//   }
// ];



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let dailyAppointments = [];

  const setDay = day => setState({ ...state, day })


  useEffect(() => {
    const urls = [`http://localhost:8001/api/days`, `http://localhost:8001/api/appointments`, `http://localhost:8001/api/interviewers`]

    Promise.all([
      axios.get(urls[0]),
      axios.get(urls[1]),
      axios.get(urls[2])
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }))
    })
      
  })

  dailyAppointments = getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return (
            <Appointment
              id={appointment.id} {...appointment}
            />
          )
        })}
      </section>
    </main>
  );
}
